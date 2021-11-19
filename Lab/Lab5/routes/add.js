const express = require("express")
const router = express.Router()
const addController = require("../controllers/AddController")

router.get('/', addController.get)
router.post('/', addController.post)

module.exports = router
