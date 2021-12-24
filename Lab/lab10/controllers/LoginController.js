class LoginController {
    login(req, res) {
        res.render("login")
    }

    checkLogin(req, res) {
        const { username, password } = req.body
        req.session.username = username

        res.redirect("/")
    }

    logout(req, res) {
        req.session.username = null

        res.redirect("/account/login")
    }
}

module.exports = new LoginController()
