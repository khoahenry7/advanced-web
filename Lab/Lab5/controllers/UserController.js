const https = require('https')

class UserController {
    getUser(req, res) {
        const id = req.params.id
        const options = {
            hostname: 'web-nang-cao.herokuapp.com',
            port: 443,
            path: '/lab5/users/' + id,
            method: 'GET'
        }
        
        const request = https.request(options, response => {
            let user
            response.on('data', data => {
                user = JSON.parse(data)
            })

            response.on('end', () => {
                res.render("profile", {user: user.data})
            })
        })

        request.end()
    }

    
}

module.exports = new UserController()
