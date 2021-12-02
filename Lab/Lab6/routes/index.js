const fileRouter = require('./FileRouter')
const accountRouter = require('./AccountRouter')
const errorController = require("../controllers/ErrorController")

module.exports = function route(app) {
    app.use("/account", accountRouter)
    app.use("/", fileRouter)
    app.use(errorController.csrf)
    app.use(errorController.notFound)
}

