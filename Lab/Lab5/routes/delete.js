const express = require("express")
const router = express.Router()
const deleteController = require("../controllers/DeleteController")

router.post('/:id', deleteController.delete)

module.exports = router
