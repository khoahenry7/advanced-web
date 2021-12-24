const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')
const rejectLogin = require('../middlewares/rejectLogin')

router.get("/login", rejectLogin, loginController.login)
router.post("/login", rejectLogin, loginController.checkLogin)
router.get("/logout", loginController.logout)

module.exports = router
