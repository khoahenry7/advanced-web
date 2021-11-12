const Product = require('../models/Product')
class HomeController {
    home(req, res, next) {
        Product.find({})
            .then(productList => res.render('index', {
                productList: productList
            }))
            .catch(next)
    }

    getId(req, res, next) {
        let id = parseInt(req.params.id)

        if (id) {
            Product.find({ product_id: id })
                .then(product => {
                    if (product.length) {
                        res.render('product', {
                            title: "Product Details",
                            product: product[0]
                        })
                    } else {
                        res.render("error", { title: "Error" })
                    }
                })
                .catch(next)
        }
    }
}

module.exports = new HomeController()
