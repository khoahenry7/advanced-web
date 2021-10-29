const Product = require('../models/Product')

class AddController {
    getAdd(req, res) {
        res.render('add', { title: "Add Product" })
    }

    postAdd(req, res) {
        if (req.body.productName && req.body.price && req.body.price && req.file) {
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
                productName: req.body.productName || '',
                price: req.body.price || '',
                description: req.body.description || ''
            })
        }
    }
}

module.exports = new AddController()
