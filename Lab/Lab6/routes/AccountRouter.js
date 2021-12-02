const express = require("express")
const router = express.Router()
const accountController = require("../controllers/AccountController")
const validate = require('../middleware/register-validate')
const csrf = require("csurf")
const csrfProtection = csrf({ cookie: true })
const rejectLogin = require("../middleware/reject-login")
const authenticate = require("../middleware/authentication")

router.get('/login', rejectLogin, csrfProtection, accountController.login)
router.get('/register', rejectLogin, csrfProtection, accountController.register)
router.get('/logout', authenticate, accountController.logout)
router.post('/verify/login', rejectLogin, csrfProtection, accountController.verify)
router.post('/verify/register', rejectLogin, csrfProtection, accountController.addAccount)

module.exports = router