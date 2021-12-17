const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const { access_token } = req.headers
    try {
        const token = jwt.verify(access_token, "Khoa-Henry")
        next()
    } catch {
        return res.json({
            code: 1,
            message: 'Permission denied',
        })
    }
}

