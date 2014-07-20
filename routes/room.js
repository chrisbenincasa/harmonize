module.exports = function(app) {
    app.all('/room/*', function(req, res, next) {
        if (!req.session || !req.session.oauth_access_token) {
            res.redirect('/');
        } else {
            next();
        }
    });

    app.get('/room/:roomId', function(req, res) {
        res.render('room', {
            title: req.params.roomId
        });
    });
};