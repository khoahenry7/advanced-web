let LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./localStorage');
// localStorage.clear();
let productList = JSON.parse(localStorage.getItem('productList'))
if (!productList) {
    productList = []
}

class EditController {
    getEdit(req, res) {
        let id = parseInt(req.params.slug)
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id === id) {
                return res.render('edit', { product: productList[i], title: "Edit Product"})
            }
        }
        res.render('error', {title: 'Error'})
    }

    postEdit(req, res) {
        let id = parseInt(req.params.slug)
        let checkId = false
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id === id) {
                checkId = true
                let image = productList[i].image;
                if (req.file) {
                    image = req.file.path.split("\\").slice(1).join("/")
                }

                let { productName, price, description } = req.body
                let productJson = {
                    id: id,
                    name: productName || productList[i].name,
                    price: price || productList[i].price,
                    image: image,
                    description: description || productList[i].name
                }

                productList[i] = productJson;
                localStorage.setItem('productList', JSON.stringify(productList))

                return res.render('index', {productList: productList})
            }
        }
        res.render('error', {title: 'Error'})
    }
}

module.exports = new EditController()
