
/*
 * GET home page.
 */

module.exports = function(app) {
    var cookieParser = require('cookie-parser'),
        config = require('../config/config.json');

    app.get('/', function(req, res) {
        console.log(app.get('cookie'))
        console.log(req.cookies, req.signedCookies)
        if (req.session && req.session.oauth_access_token && req.session.oauth_access_secret) {
            res.cookie('oauth_crap', JSON.stringify({
                token: req.session.oauth_access_token,
                secret: req.session.oauth_access_secret
            }), {
                secure: true,
                signed: true,
                expires: new Date(Date.now() + 9000000)
            });
        }

        var x = cookieParser.signedCookies(req.cookies, config.session_secret);
        console.log(x)

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
