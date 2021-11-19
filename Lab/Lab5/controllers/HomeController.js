const https = require('https')

class HomeController {
    get(req, res) {
        const options = {
            hostname: 'web-nang-cao.herokuapp.com',
            port: 443,
            path: '/lab5/users',
            method: 'GET'
        }
        
        const request = https.request(options, response => {
            let users
            response.on('data', data => {
                users = JSON.parse(data)
            })
            response.on('end', () => {
                res.render("index", {users: users})
            })
        })

        request.end()
    }

}

module.exports = new HomeController()
