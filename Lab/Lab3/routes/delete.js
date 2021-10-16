const express = require('express')
const router = express.Router()

const deleteController = require('../controllers/DeleteController')

router.get('/:slug', deleteController.getDelete)
router.post('/:slug', deleteController.postDelete)

module.exports = router