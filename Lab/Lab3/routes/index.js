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

    app.use(checkLoginMiddleware)
    app.use('/logout', logoutRouter)
    app.use('/add', addRouter)
    app.use('/edit', editRouter)
    app.use('/delete', deleteRouter)
    app.use('/', homeRouter)
}

module.exports = route
