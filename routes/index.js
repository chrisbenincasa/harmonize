
/*
 * GET home page.
 */

module.exports = function(app) {
    app.get('/', function(req, res) {
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
