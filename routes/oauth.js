module.exports = function(app) {
    var constants = {
            oauth_callback: 'http://local.chrisbenincasa.com:3000/oauth/callback'
        },
        url = require('url'),
        oauth = app.get('oauth');

    app.get('/oauth/login', function(req, res) {
        if (!req.session.oauth_access_token) {
            oauth.getOAuthRequestToken({
                oauth_callback: constants.oauth_callback
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
            console.log('already have a token');
            res.redirect('/');
        }
    });

    app.get('/oauth/callback', function(req, res) {
        var parsedUrl = url.parse(req.url, true).query;
        oauth.getOAuthAccessToken(parsedUrl.oauth_token, req.session.oauth_secret, parsedUrl.oauth_verifier,
            function(err, oauth_access_token, oauth_access_secret, results) {
                if (err) {
                    console.log(err);
                    throw new Error(err);
                } else {
                    console.log(arguments)
                    req.session.oauth_access_token = oauth_access_token;
                    req.session.oauth_access_secret = oauth_access_secret;
                    res.redirect('/');
                }
            });
    });
};