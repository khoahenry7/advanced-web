const express = require('express')
const router = express.Router()

const homeController = require('../controllers/HomeController')


router.get('/index', homeController.home)
router.get("/:slug", homeController.getSlug)
router.get('/', homeController.home)

module.exports = router