function authenticate(req, res, next) {
    if (!req.session.username) {
        res.redirect("/account/login")
    } else {
        next()
    }
}

module.exports = authenticate
