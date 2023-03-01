
//from passport js documentation we are making auth rules here so auth protected links cannot be visited without logging in
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        //if authenticated user can view
        if(req.isAuthenticated()) {
            return next();
        }
        //if not authenticated we redirect them so login page
        res.redirect('/login')
    }
}