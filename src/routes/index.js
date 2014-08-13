module.exports = function(app) {
    var cookieParser = require('cookie-parser'),
        fs = require('fs'),
        path = require('path'),
        config = require('../config/config.json'),
        constants = require('../utils/constants.json');

    app.all('/*', function(req, res, next) {
        // TODO obviously don't save oauth information in a cookie...
        // This is for development ease and should be chucked when a more
        // persistant session store is used.
        if (!req.signedCookies.oauth_crap && req.session &&
            req.session.oauth_access_token && req.session.oauth_access_secret) {
            res.cookie('oauth_crap', {
                token: req.session.oauth_access_token,
                secret: req.session.oauth_access_secret
            }, {
                signed: true
            });
        }

        if (req.signedCookies.oauth_crap) {
            var oauth_crap = req.signedCookies.oauth_crap;
            req.session.oauth_access_token = oauth_crap.token;
            req.session.oauth_access_secret = oauth_crap.secret;
        }

        next();
    });

    app.get('/', function(req, res) {
        res.render('index', {
            title: constants.title,
            authorized: req.session.oauth_access_token,
            rooms: [
                {
                    name: 'Rock',
                    id: 'rock'
                }, {
                    name: 'Jazz',
                    id: 'jazz'
                }
            ]
        });
    });

    require('./partials')(app);
    require('./oauth')(app);
    require('./room')(app);
    // Uncomment for deep-linking but redirect loops...
    // app.all('/*', function(req, res) {
    //     res.render('empty-head');
    // });
};
