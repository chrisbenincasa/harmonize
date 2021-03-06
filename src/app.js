(function() {
    var config = require('./config/config.json'),
        constants = require('./utils/constants.json'),
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
    // TODO uncomment below when a favicon exists
    // app.use(require('serve-favicon')());
    app.use(require('morgan')('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(require('cookie-parser')(config.session_secret));
    app.use(require('express-session')({
        secret: config.session_secret,
        resave: true,
        saveUninitialized: true
    }));

    app.set('oauth', new OAuth.OAuth(
        constants.rdioRequestTokenUrl,
        constants.rdioAccessTokenUrl,
        config.client_token,
        config.client_secret,
        '1.0',
        null,
        'HMAC-SHA1')
    );

    // Start attaching routes.
    // The order here is VERY important
    // Attach paths to static assets first so they have precendence
    // Then attach routes with more general routes ("/*") coming last

    // set up LESS middleware
    // LESS searched for at /public/less
    // CSS served at /public/css
    app.use(require('less-middleware')('/less', {
        dest: '/css',
        pathRoot: path.join(__dirname, 'public')
    }));

    app.use(express.static(path.join(__dirname, 'public')));

    // attach all routes
    require('./routes')(app);

    // Handle 404s
    app.use(function(req, res, next) {
        res.send(404, 'Sorry cant find that!');
    });

    // End attaching routes

    if (env === 'development') {
        app.use(require('errorhandler'));
        app.locals.pretty = true;
    }

    // Include environment as a local so it is accessible in views
    app.locals.env = env;

    // Initialize app server
    server = app.listen(app.get('port'));

    // Initialize WebSocket server
    ioServer = io(server);

    ioServer.on('connection', function(socket) {
        console.log(socket.id + ' connected');
        socket.on('join_room', function(data) {
            console.log(socket.id + ' joined room');
            socket.join(data.room, function(err, data) {
                if (err) {
                    throw new Error(err);
                }
                console.log(socket.rooms);
            });
            console.log('socket joined room ' + data.room);
        });

        socket.on('time_updated', function(data) {
            console.log(socket.id + ' position: ' + data.position);
        });
    });
})();
