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

    update(req, res, next) {
        let id = parseInt(req.params.id)
        let image
        if (req.file) {
            image = req.file.path.split("\\").slice(1).join("/")
        }

        Product.findOne({ product_id: id })
            .then(product => {
                if (product.length > 0) {
                    image = product.image
                    if (image) {
                        unlink(path.join(__dirname, '../public/' + product.image))
                    }
                }
            })
            .catch(next)
        Product.updateOne({ product_id: id }, {
            name: req.body.productName,
            price: req.body.price,
            image: image,
            description: req.body.description
        })
            .then(() => res.redirect('../'))
            .catch(next)

    }
}

module.exports = new EditController()

