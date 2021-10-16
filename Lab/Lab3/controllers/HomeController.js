let LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./localStorage');
// localStorage.clear();

class HomeController {
    
    home(req, res) {
        let productList = JSON.parse(localStorage.getItem('productList'))
        if (!productList) {
            productList = []
        }
        res.render('index', {productList: productList})
    }


    getSlug(req, res) {
        let productList = JSON.parse(localStorage.getItem('productList'))
        if (!productList) {
            productList = []
        }
        let id = parseInt(req.params.slug)
        
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id === id) {
                return res.send(` 
                <html>

                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css"
                        integrity="sha512-5D0ofs3AsWoKsspH9kCWlY7qGxnHvdN/Yz2rTNwD9L271Mno85s+5ERo03qk9SUNtdgOZ4A9t8kRDexkvnWByA=="
                        crossorigin="anonymous" referrerpolicy="no-referrer" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
                        integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
                        crossorigin="anonymous" referrerpolicy="no-referrer" />
                    <title>Product Details</title>
                </head>
                <body>
                    <div class="m-10">
                        <h3 class="text-3xl mb-4 text-blue-500 text-left text-bold">Product Id = ${productList[i].id}</h3> 
                        <div class="container flex justify-left flex flex-col w-full border rounded border-gray-200">
                            <table>
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-12 py-4 text-lg text-gray-900 text-center">
                                            ID
                                        </th>
                                        <th class="px-12 py-4 text-lg text-gray-900 text-center">
                                            Product name
                                        </th>
                                        <th class="px-12 py-4 text-lg text-gray-900 text-center">
                                            Price
                                        </th>
                                        <th class="px-12 py-4 text-lg text-gray-900 text-center">
                                            Image
                                        </th>
                                        <th class="px-12 py-4 text-lg text-gray-900 text-center">
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    <tr class="whitespace-nowrap">
                                        <td class="px-12 py-6 text-sm text-gray-900 text-center text-lg">
                                            ${productList[i].id} 
                                        </td>
                                        <td class="px-12 py-6 text-sm text-gray-900 text-center text-lg">
                                            ${productList[i].name}  
                                        </td>
                                        <td class="px-12 py-6 text-sm text-gray-900 text-center text-lg">
                                            ${productList[i].price}$
                                        </td>
                                        <td class="px-12 py-6 text-sm text-gray-900 text-center text-lg flex justify-center">
                                            <img class="w-20" src="${productList[i].image}" />
                                        </td>
                                        <td class="px-12 py-6 text-sm text-gray-900 text-center text-lg">
                                            ${productList[i].description}
                                        </td>
                                    </tr>                              
                                </tbody>
                            </table>
                        </div>
                    </div>
                </body>

                </html>`)
            }
        }

        res.render('error', {title: 'Error'})
    }
}

module.exports = new HomeController()
