const Product = require('../models/Product')

class ProductController {
    async showListProduct(req, res) {
        await Product.find({})
            .then(products => {
                return res.json({
                    code: 0,
                    message: 'Success',
                    data: products
                })
            })
            .catch(err => {
                return res.json(err)
            })
    }

    addProduct(req, res) {
        const { name, price } = req.body
        let error

        if (!name || !price) {
            return res.end(JSON.stringify({
                code: 1,
                message: "Please enter enough information!!"
            }))
        }

        let product = new Product({ name, price })
        product.save()

        return res.end(JSON.stringify({
            code: 0,
            message: "Add Product successfully"
        }))
    }

    async showProduct(req, res) {
        const _id = req.params.id
        await Product.findOne({ _id })
            .then(product => {
                return res.json({
                    code: 0,
                    message: 'Success',
                    data: product
                })
            })
            .catch(err => {
                return res.json({
                    code: 1,
                    message: err
                })
            })
    }

    async updateProduct(req, res) {
        const _id = req.params.id
        const { name, price } = req.body

        if (!name || !price) {
            return res.end(JSON.stringify({
                code: 1,
                message: "Please enter enough information!!"
            }))
        }

        await Product.updateOne({ _id }, {
            name, price
        })
            .then(product => {
                return res.json({
                    code: 0,
                    message: 'Update success'
                })
            })
            .catch(err => {
                return res.json({
                    code: 1,
                    message: err
                })
            })
    }

    async deleteProduct(req, res) {
        const _id = req.params.id

        await Product.deleteOne({ _id })
            .then(() => {
                return res.json({
                    code: 0,
                    message: 'Delete success'
                })
            })
            .catch(err => {
                return res.json({
                    code: 1,
                    message: err
                })
            })
    }
}

module.exports = new ProductController()
