module.exports = function(app) {
    app.get('/partials/:partial.html', function(req, res) {
        console.log(req.params.partial);
        res.render(req.params.partial);
    });
};
