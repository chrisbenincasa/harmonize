module.exports = function(app) {
    var constants = require('../utils/constants.json'),
        oauth = app.set('oauth'),
        url = require('url'),
        path = require('path');

    app.get('/oauth/login', function(req, res) {
        var callbackUrl = req.protocol + '://' + path.join(req.hostname + ':' + app.set('port'), constants.oauthCallbackPath);
        if (!req.session.oauth_access_token) {
            oauth.getOAuthRequestToken({
                oauth_callback: callbackUrl
            }, function(err, oauth_token, oauth_secret, results) {
                if (err) {
                    throw new Error(err);
                } else {
                    req.session.oauth_token = oauth_token;
                    req.session.oauth_secret = oauth_secret;
                    res.redirect(results.login_url + '?oauth_token=' + oauth_token);
                }
            });
        } else {
            res.redirect('/');
        }
    });

    app.get('/oauth/callback', function(req, res) {
        var parsedUrl = url.parse(req.url, true).query;
        oauth.getOAuthAccessToken(parsedUrl.oauth_token, req.session.oauth_secret, parsedUrl.oauth_verifier,
            function(err, oauth_access_token, oauth_access_secret) {
                if (err) {
                    throw new Error(err);
                } else {
                    req.session.oauth_access_token = oauth_access_token;
                    req.session.oauth_access_secret = oauth_access_secret;
                    res.redirect('/');
                }
            });
    });
};
