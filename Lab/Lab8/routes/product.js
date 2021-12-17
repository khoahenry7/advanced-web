const express = require("express")
const router = express.Router()
const productController = require("../controllers/ProductController")
const accessToken = require("../middleware/access-token")

router.get("/", accessToken, productController.showListProduct)
router.post("/", accessToken, productController.addProduct)
router.get("/:id", accessToken, productController.showProduct)
router.put("/:id", accessToken, productController.updateProduct)
router.delete("/:id", accessToken, productController.deleteProduct)

module.exports = router
