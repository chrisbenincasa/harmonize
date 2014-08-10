module.exports = function(app) {
    var oauth = app.set('oauth');

    app.get('/room/:roomId', function(req, res) {
        // TODO use "next" and a filter to pipe request through oauth stuff
        var roomResultFunc = function() {
            res.render('room', {
                title: req.params.roomId,
                playbackToken: req.session.playback_token
            });
        };

        if (!req.session.playback_token) {
            oauth.post(
                'http://api.rdio.com/1/',
                req.session.oauth_access_token,
                req.session.oauth_access_secret,
                {
                    method: 'getPlaybackToken',
                    domain: encodeURIComponent(req.hostname)
                },
                null,
                function(err, data, resp) {
                    var jsonResult;
                    if (!err && data) {
                        jsonResult = JSON.parse(data);
                        req.session.playback_token = jsonResult.result;
                        roomResultFunc();
                    } else {
                        res.redirect('/');
                    }
                }
            );
        } else {
            roomResultFunc();
        }
    });
};
