const loginRouter = require('./login')
const logoutRouter = require('./logout')
const homeRouter = require('./home')
const addRouter = require('./add')
const editRouter = require('./edit')
const deleteRouter = require('./delete')
const checkLoginMiddleware = require('../middleware/checkLogin')
const rejectLoginMiddleware = require('../middleware/rejectLogin')

function route(app) {
    app.use('/login', rejectLoginMiddleware, loginRouter)
    app.use('/logout', checkLoginMiddleware, logoutRouter)
    app.use('/add', checkLoginMiddleware, addRouter)
    app.use('/edit', checkLoginMiddleware, editRouter)
    app.use('/delete', checkLoginMiddleware, deleteRouter)
    app.use('/', checkLoginMiddleware, homeRouter)
}

module.exports = route