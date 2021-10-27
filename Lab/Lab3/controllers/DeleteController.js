const fs = require('fs')
const { promisify } = require('util')
const unlink = promisify(fs.unlink)
const path = require('path')
const Product = require('../models/Product')
class DeleteController {
    getDelete(req, res, next) {
        let id = parseInt(req.params.id)
        Product.find({ product_id: id })
            .then(product => res.render('delete', {
                title: 'Delete Product',
                product: product[0]
            }))
            .catch(next)
    }

    delete(req, res, next) {
        let id = parseInt(req.params.id)

        Product.findOneAndDelete({ product_id: id })
            .then(product => {
                unlink(path.join(__dirname, '../public/' + product.image))
                res.redirect('../')
            })
            .catch(next)
    }
}

module.exports = new DeleteController()
