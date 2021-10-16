let LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./localStorage');
// localStorage.clear();
let productList = JSON.parse(localStorage.getItem('productList'))
if (!productList) {
    productList = []
}

class AddController {
    getAdd(req, res) {
        res.render('add', {title: "Add Product"})
    }

    postAdd(req, res) {
        if (req.body.productName && req.body.price && req.body.price && req.file.path) {
            let { productName, price, description } = req.body
            let productJson = {
                id: productList[length - 1] + 1,
                name: productName,
                price: price,
                image: req.file.path.split("\\").slice(1).join("/"),
                description: description
            }  
    
            productList.push(productJson)
            localStorage.setItem('productList', JSON.stringify(productList))

            console.log(productList)
            res.render('index', {productList: productList})
        } else {
            res.render('add', {error: "Please enter enough information", title: "Add Product"})
        }
    }
}

module.exports = new AddController()
