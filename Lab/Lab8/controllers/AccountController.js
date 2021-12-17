const Account = require('../models/Account')
const jwt = require("jsonwebtoken")
class AccountController {
    async register(req, res) {
        const { name, email, password } = req.body
        const user = {
            name, email, password
        }

        let error

        if (!name || !email || !password) {
            error = "Please enter enough information"
        } else {
            await Account.findOne({ email: user.email })
                .then(account => {
                    if (account) {
                        error = "Email already existed"
                    }
                })
                .catch(err => {
                    error = err
                })
        }

        if (error) {
            return res.json({
                code: 1,
                message: error
            })
        } else {
            let account = new Account(user)
            account.setPassword(user.password)
            account.save()

            return res.end(JSON.stringify({
                code: 0,
                message: "Register successfully"
            }))
        }
    }

    async login(req, res) {
        const { email, password } = req.body

        const user = { email: email, password: password }
        let error

        if (!email || !password) {
            error = "Please enter enough information"
        } else {
            await Account.findOne({ email: email })
                .then(account => {
                    if (account && account.validPassword(user.password)) {
                        let token = jwt.sign({
                            data: { email },
                            exp: Math.floor(Date.now() / 1000 + (60 * 60))
                        }, "Khoa-Henry")

                        return res.end(JSON.stringify({
                            code: 0, message: "Login successful", token: token
                        }))
                    } else {
                        error = "Invalid email or password"
                    }
                })
        }

        if (error) {
            return res.json({
                code: 1, message: error
            })
        }
    }
}

module.exports = new AccountController()
