const express = require('express')
const router = express.Router()

const logoutController = require('../controllers/LogoutController')

router.use('/', logoutController.logout)

module.exports = router