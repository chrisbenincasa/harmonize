module.exports = function(app) {
    var rdio = require('rdio')({});
    var oauth = app.set('oauth');

    app.all('/room/*', function(req, res, next) {
        if (!req.session || !req.session.oauth_access_token) {
            res.redirect('/');
        } else {
            next();
        }
    });

    app.get('/room/:roomId', function(req, res) {
        console.log(req.session.oauth_access_token, req.session.oauth_access_secret);
        oauth.post(
            'http://api.rdio.com/1/',
            req.session.oauth_access_token,
            req.session.oauth_access_secret,
            {
                method: 'getPlaybackToken',
                domain: encodeURIComponent(req.host)
            },
            null,
            function(err, data, resp) {
                console.log(err, data);
            }
        );

        res.render('room', {
            title: req.params.roomId
        });
    });
};
