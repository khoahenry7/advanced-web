function rejectLogin(req, res, next) {
    if (req.session.username) {
        res.redirect("/")
    } else {
        next()
    }
}

module.exports = rejectLogin
