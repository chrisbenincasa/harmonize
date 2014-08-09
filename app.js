(function() {
    var config = require('./config/config.json'),
        express = require('express'),
        http = require('http'),
        path = require('path'),
        io = require('socket.io'),
        OAuth = require('oauth'),
        cons = require('consolidate'),
        bodyParser = require('body-parser');

    var env = process.env.NODE_ENV || 'development',
        app = express(),
        server,
        ioServer;

    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.engine('jade', cons.jade);
    app.set('view engine', 'jade');
    // app.use(require('serve-favicon')());
    app.use(require('morgan')('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(require('cookie-parser')(config.session_secret));
    app.use(require('express-session')({
        secret: config.session_secret,
        resave: true,
        saveUninitialized: true
    }));

    // attach all routes
    require('./routes')(app);

    // set up LESS middleware
    // LESS searched for at /public/less
    // CSS served at /public/css
    app.use(require('less-middleware')('/less', {
        dest: '/css',
        pathRoot: path.join(__dirname, 'public')
    }));

    app.use(express.static(path.join(__dirname, 'public')));

    if (env === 'development') {
        app.use(require('errorhandler'));
    }

    app.set('oauth', new OAuth.OAuth(
        'http://api.rdio.com/oauth/request_token',
        'http://api.rdio.com/oauth/access_token',
        config.client_token,
        config.client_secret,
        '1.0',
        null,
        'HMAC-SHA1'));

    server = app.listen(app.get('port'));

    ioServer = io(server);

    ioServer.on('connection', function(socket) {
        socket.on('join room', function(data) {
            socket.join(data.room, function(err, data) {
                if (err) {
                    throw new Error(err);
                }
                console.log(socket.rooms);
            });
            console.log('socket joined room ' + data.room);
        });
    });
})();
