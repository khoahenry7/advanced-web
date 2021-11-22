const https = require('https')

class AddController {
    get(req, res) {
        res.render("add")
    }

    post(req, res) {
        let user = JSON.stringify({
            name: req.body.name,
            age: parseInt(req.body.age),
            gender: req.body.gender,
            email: req.body.email
        })

        const options = {
            hostname: 'web-nang-cao.herokuapp.com',
            port: 443,
            path: '/lab5/users',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        console.log(user)

        const request = https.request(options, response => {
            let msg
            response.on('data', data => {
                msg = JSON.parse(data)
            })
            response.on('end', () => {
                if (msg.code === 1) {
                    res.render("add", { 
                        msg,
                        name: req.body.name || '',
                        age: parseInt(req.body.age) || '',
                        gender: req.body.gender || '',
                        email: req.body.email || ''
                    })
                } else {
                    res.redirect("/")
                }
            })
        })

        request.write(user) // post
        request.end()
    }
}

module.exports = new AddController()
