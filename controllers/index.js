exports.home = function(req, res, next) {
    console.log('===> Original URL: ' + req.session.url);
    res.render('index', { 
        title: 'Home',
        menuId: 'Home',
        userName: req.user ? req.user.username : 'Guest'
    });
};