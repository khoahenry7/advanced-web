const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')

const addController = require('../controllers/AddController')

router.get('/', addController.getAdd)
router.post('/', upload.single('image'), addController.postAdd)


module.exports = router
