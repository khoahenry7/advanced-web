let LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./localStorage');
// localStorage.clear();
let productList = JSON.parse(localStorage.getItem('productList'))
if (!productList) {
    productList = []
}

class HomeController {
    getDelete(req, res) {
        let id = parseInt(req.params.slug)
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id === id) {
                return res.render('delete', { product: productList[i], title: 'Error' })
            }
        }
        res.render('error', {title: 'Error'})
    }

    postDelete(req, res) {
        let id = parseInt(req.params.slug)
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id === id) {
                productList.splice(i, 1)
                localStorage.setItem('productList', JSON.stringify(productList))
                return res.render('index', { productList: productList })
            }
        }
        res.render('error', {title: 'Error'})
    }
}

module.exports = new HomeController()
