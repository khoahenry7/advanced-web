const path = require('path')
const multer = require('multer')
const crypto = require('crypto')
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const Product = require('../models/Product')

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

class AddController {
    getAdd(req, res) {
        res.render('add', { title: "Add Product" })
    }

    postAdd(req, res) {
        if (req.body.productName && req.body.price && req.body.price && req.file.path) {
            Product.countDocuments({}, function (error, size) {
                let { productName, price, description } = req.body
                let productJson
                productJson = {
                    product_id: size + 1,
                    name: productName,
                    price: price,
                    image: req.file.path.split("\\").slice(1).join("/"),
                    description: description
                }
                let product = new Product(productJson)

                product.save()
                res.redirect('index')
            })
        } else {
            res.render('add', { 
                error: "Please enter enough information", 
                title: "Add Product",
            })
        }
    }
}

module.exports = new AddController()
