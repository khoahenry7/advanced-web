const express = require("express")
const Account = require("../models/account")
// const { validationResult } = require('express-validator')
const fs = require('fs')
const path = require('path')

class AccountController {
    login(req, res) {
        res.render('login', { csrfToken: req.csrfToken() })
    }

    register(req, res) {
        res.render('register', { csrfToken: req.csrfToken() })
    }

    async verify(req, res) {
        let user

        for (let i in req.body) {
            user = JSON.parse(i)
        }

        await Account.findOne({ username: user.username })
            .then(account => {
                if (account.validPassword(user.password)) {
                    req.session.name = account.name
                    req.session.username = account.username

                    // req.use(express.static(path.join(__dirname, '../public/file_management/', req.session.username)))
                    return res.json({ success: true, message: "Login successful!!" })
                } else {
                    return res.json({ success: false, message: "Invalid password!!" })
                }
            })
            .catch(err => res.json({ success: false, message: "Username does not exits!!" }))
    }

    async addAccount(req, res) {
        // let result = validationResult(req)
        // let error = ""
        // console.log(result)

        let user, error

        for (let i in req.body) {
            user = JSON.parse(i)
        }

        if (user.name === "") {
            error = "Please enter your Fullname"
        } else if (user.username === "") {
            error = "Please enter your Username"
        } else if (user.password.length < 6) {
            error = "Password must be at least 6 characters"
        } else if (user.confirmPassword.length < 6) {
            error = "Confirm password must be at least 6 characters"
        } else if (user.password !== user.confirmPassword) {
            error = "Confirm password incorrect"
        }

        await Account.findOne({ username: user.username })
            .then(account => {
                if (account) {
                    error = "Username already exits"
                }
            })

        if (error) {
            return res.json({ success: false, message: error })
        } else {
            let account = new Account(user)
            account.setPassword(user.password)
            account.save()

            // Create folder username
            let dir = "public/file_management/" + user.username + "/"
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true })
            }

            return res.json({ success: true, message: "Register successful" })
        }
    }


    logout(req, res) {
        req.session.destroy()
        return res.redirect("login")
    }
}

module.exports = new AccountController()
