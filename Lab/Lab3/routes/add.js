const express = require('express')
const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const addController = require('../controllers/AddController')

router.get('/', addController.getAdd)
router.post('/', upload.single('image'), addController.postAdd)

module.exports = router