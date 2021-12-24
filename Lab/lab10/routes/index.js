const chatRouter = require('./chat')
const loginRouter = require('./login')


module.exports = function route(app) {
    app.use("/", chatRouter)
    app.use("/account", loginRouter)
}