const https = require('https')

class DeleteController {
    delete(req, res) {
        let userId = req.params.id

        if (userId) {
            const options = {
                hostname: 'web-nang-cao.herokuapp.com',
                port: 443,
                path: '/lab5/users/' + userId,
                method: 'DELETE'
            }

            const request = https.request(options, response => {
                let msg
                response.on('data', data => {
                    msg = JSON.parse(data)
                })

                response.on('end', () => {
                    return res.json({ code: 0, message: "Delete user successfully!!!" })
                })
            })

            request.end()
        } else {
            return res.json({ code: 1, message: "Invalid id" })
        }
    }

}

module.exports = new DeleteController()
