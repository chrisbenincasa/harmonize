
/*
 * GET home page.
 */

module.exports = function(app) {
    var cookieParser = require('cookie-parser'),
        config = require('../config/config.json');

    app.get('/', function(req, res) {
        // TODO obviously don't save oauth information in a cookie...
        // This is for development ease and should be chucked when a more
        // persistant session store is used.
        if (!req.signedCookies.oauth_crap && req.session &&
            req.session.oauth_access_token && req.session.oauth_access_secret) {
            var p = res.cookie('oauth_crap', {
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

        res.render('index', {
            title: 'Express',
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

    require('./oauth')(app);
    require('./room')(app);
};
