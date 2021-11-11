const fs = require('fs')
const { promisify } = require('util')
const unlink = promisify(fs.unlink)
const path = require('path')
const Product = require('../models/Product')
class EditController {

    edit(req, res, next) {
        let id = parseInt(req.params.id)
        Product.find({ product_id: id })
            .then(product => res.render('edit', {
                title: 'Edit Product',
                product: product[0]
            }))
            .catch(next)
    }

    async update(req, res, next) {
        let id = parseInt(req.params.id)
        let image, error
        if (req.file) {
            if (!req.file.mimetype.match(/image.*/)) {
                error = "Only image files are supported"
            } else if (req.file.size > (1024 * 1024 * 20)) {
                error = "Image size too large"
            } else {
                image = req.file.path.split("\\").slice(1).join("/")
            }
        }

        if (!req.body.productName) {
            error = `Please enter <strong> Product Name </strong>`
        } else if (!req.body.price) {
            error = `Please enter <strong> Product Price </strong>`
        } else if (!req.body.description) {
            error = `Please enter <strong> Description </strong>`
        } else {
            await Product.findOne({ product_id: id })
                .then(product => {
                    if (product.length > 0) {
                        image = product.image
                        if (image) {
                            unlink(path.join(__dirname, '../public/' + product.image))
                        }
                    }
                })
                .catch(next)
            await Product.updateOne({ product_id: id }, {
                name: req.body.productName,
                price: req.body.price,
                image: image,
                description: req.body.description
            })
        }

        if (error) {
            let product = {
                product_id: id,
                name: req.body.productName || '',
                price: req.body.price || '',
                description: req.body.description || ''
            }

            if (req.file) {
                unlink(path.join(__dirname, '../public/uploads/' + req.file.filename))
            }

            res.render('edit', {
                error: error,
                title: "Edit Product",
                product: product
            })
        } else {
            res.redirect("../")
        }
    }
}

module.exports = new EditController()

