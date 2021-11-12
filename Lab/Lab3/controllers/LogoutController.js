
class LogoutController {
    logout(req, res) {
        req.session.destroy()
        res.render('login', {
            title: "Login",
            email: ""
        })
    }
}

module.exports = new LogoutController()
