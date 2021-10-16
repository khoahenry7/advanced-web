require("express-session")
require('dotenv').config()

class LoginController {
    get(req, res) {
        res.render('login', {title: "Login", email: ""})
    }

    post(req, res) {
        const email = req.body.email
        const password = req.body.password
        if (email === process.env.EMAIL && password === process.env.PASSWORD) {
            req.session.email = email
            res.redirect('index')
        } else {
            res.render('login', {error: "Invalid email or password", title: "Login", email: req.body.email})
        }
    }
}

module.exports = new LoginController