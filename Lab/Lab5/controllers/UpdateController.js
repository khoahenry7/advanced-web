const https = require('https')

class UpdateController {
    update(req, res) {
        let id = req.params.id
        let user = JSON.stringify({
            id: id,
            name: req.body.name,
            age: parseInt(req.body.age),
            gender: req.body.gender,
            email: req.body.email
        })

        console.log("user: " + user)

        const options = {
            hostname: 'web-nang-cao.herokuapp.com',
            port: 443,
            path: '/lab5/users',
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }
        }

        const request = https.request(options, response => {
            let msg
            response.on('data', data => {
                // msg = JSON.parse(data)
                console.log(typeof data)
                console.log("data: " + data)
            })

            response.on('end', () => {
                // return res.json({ code: 0, message: msg })
                return res.redirect("/")
            })
        })

        request.write(user)
        request.end()
    }
}

module.exports = new UpdateController()
