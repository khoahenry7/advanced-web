class ErrorController {
    error(req, res) {
        res.status(404)
        res.render('error')
    }
}

module.exports = new ErrorController()
