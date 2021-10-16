
class LogoutController {
    logout(req, res) {
        req.session.destroy()
        res.render('login', {title: "Login"})
    }   
}

module.exports = new LogoutController()
