const express = require("express")
const router = express.Router()
const fileController = require("../controllers/FileController")
const authenticate = require("../middleware/authentication")
const upload = require("../middleware/upload")

router.get('/', authenticate, fileController.index)
router.post('/file/upload', authenticate, fileController.uploadFile)

module.exports = router
