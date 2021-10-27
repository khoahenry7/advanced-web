const express = require('express')
const router = express.Router()

const deleteController = require('../controllers/DeleteController')

router.get('/:id', deleteController.getDelete)
router.delete('/:id', deleteController.delete)

module.exports = router
