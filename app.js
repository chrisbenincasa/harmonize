
var config = require('./config/config.json'),
    express = require('express'),
    routes = require('./routes'),
    room = require('./routes/room'),
    http = require('http'),
    path = require('path'),
    io = require('socket.io'),
    session = require('express-session'),
    OAuth = require('oauth'),
    cons = require('consolidate');

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.engine('jade', cons.jade);
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(session({
        secret: "some_random_secret",
        resave: true,
        saveUninitialized: true
    }));

    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.set('oauth', new OAuth.OAuth(
    'http://api.rdio.com/oauth/request_token',
    'http://api.rdio.com/oauth/access_token',
    config.client_token,
    config.client_secret,
    '1.0',
    null,
    'HMAC-SHA1'));

var server = app.listen(app.get('port'));

require('./routes')(app);

var ioServer = io(server);

ioServer.on('connection', function(socket) {
    socket.on('join room', function(data) {
        socket.join(data.room, function(err, data) {
            if (err) {
                console.log(err);
            }
            console.log(socket.rooms);
        });
        console.log('socket joined room ' + data.room);
    });
});
