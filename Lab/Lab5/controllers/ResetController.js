const https = require('https')

class ResetController {
    reset(req, res) {
        const options = {
            hostname: 'web-nang-cao.herokuapp.com',
            port: 443,
            path: '/lab5/reset',
            method: 'GET'
        }
        
        const request = https.request(options, response => {
            res.redirect("/")
        })

        request.end()
    }

    
}

module.exports = new ResetController()
