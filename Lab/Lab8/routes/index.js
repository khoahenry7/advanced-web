const accountRouter = require("./account")
const productRouter = require("./product")

module.exports = function route(app) {
    app.use("/account", accountRouter)
    app.use("/products", productRouter)
}