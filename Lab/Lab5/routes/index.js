const homeRouter = require('./home')
const addRouter = require('./add')
const deleteRouter = require('./delete')
const userRouter = require('./user')
const updateRouter = require('./update')
const resetRouter = require('./reset')
const errorRouter = require('./error')

function route(app) {
    app.use('/add', addRouter)
    app.use('/delete', deleteRouter)
    app.use('/update', updateRouter)
    app.use('/users', userRouter)
    app.use('/reset', resetRouter)
    app.use('/', homeRouter)
    app.use(errorRouter)
}

module.exports = route
