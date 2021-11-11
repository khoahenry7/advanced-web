const fs = require('fs')
const { promisify } = require('util')
const unlink = promisify(fs.unlink)
const path = require('path')
const Product = require('../models/Product')

class AddController {
    getAdd(req, res) {
        res.render('add', { title: "Add Product" })
    }

    postAdd(req, res) {
        let error 
        
        if (req.file) {
            if (!req.file.mimetype.match(/image.*/)) {
                error = "Only image files are supported"
            } else if (req.file.size > (1024 * 1024 * 20)) {
                error = "Image size too large"
            }
        } 
        
        if (!req.body.productName) {
            error = `Please enter <strong> Product Name </strong>`
        } else if (!req.body.price) {
            error = `Please enter <strong> Product Price </strong>`
        } else if (!req.file) {
            error = `Please upload <strong> an Product Image </strong>`
        } else if (!req.body.description) {
            error = `Please enter <strong> Description </strong>`
        } else {
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
            })
        } 

        if (error) {
            if (req.file) {
                unlink(path.join(__dirname, '../public/uploads/' + req.file.filename))
            }
            res.render('add', {
                error: error,
                title: "Add Product",
                productName: req.body.productName || '',
                price: req.body.price || '',
                description: req.body.description || ''
            })
        } else {
            res.redirect('../')
        }
    }
}

module.exports = new AddController()
