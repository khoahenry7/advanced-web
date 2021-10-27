const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, crypto.createHash('md5').update(Math.random().toString()).digest('hex')
            + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const editController = require('../controllers/EditController')

router.get('/:id', editController.edit)
router.put('/:id', upload.single('image'), editController.update)

module.exports = router
