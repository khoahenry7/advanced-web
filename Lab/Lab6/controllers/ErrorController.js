class ErrorController {
    csrf(err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN') return next(err)

        res.status(403)
        res.send('invalid csrf token')
    }

    notFound(req, res) {
        res.status(404)
        res.render('error')
    }
}

module.exports = new ErrorController()
