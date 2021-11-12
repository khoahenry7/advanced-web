const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')

const editController = require('../controllers/EditController')

router.get('/:id', editController.edit)
router.put('/:id', upload.single('image'), editController.update)

module.exports = router
