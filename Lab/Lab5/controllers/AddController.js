const https = require('https')

class AddController {
    get(req, res) {
        res.render("add")
    }

    post(req, res) {
        let user = JSON.stringify(req.body)

        const options = {
            hostname: 'web-nang-cao.herokuapp.com',
            port: 443,
            path: '/lab5/users',
            method: 'POST',
            // headers: { 'Content-Type': "application/json"},
            // data: user,
            // body: user,
            // "name": user.name,
            // user: user
        }

        const request = https.request(options, response => {
            let users
            response.on('data', data => {
                users = JSON.parse(data)
                console.log(users)
            })
            response.on('end', () => {
                // res.redirect("../")
            })
        })
        // res.redirect('/add')
        request.end()
    }
}

module.exports = new AddController()
