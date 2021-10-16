const express = require('express')
const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const editController = require('../controllers/EditController')

router.get('/:slug', editController.getEdit)
router.post('/:slug', upload.single('image'), editController.postEdit)

module.exports = router