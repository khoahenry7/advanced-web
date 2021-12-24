const express = require('express')
const router = express.Router()
const chatController = require('../controllers/ChatController')
const checkLogin = require('../middlewares/checkLogin')


router.get("/", checkLogin, chatController.index)

module.exports = router
