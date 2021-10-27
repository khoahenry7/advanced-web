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

const addController = require('../controllers/AddController')

router.get('/', addController.getAdd)
router.post('/', upload.single('image'), addController.postAdd)
// router.post('/', addController.postAdd)


module.exports = router
