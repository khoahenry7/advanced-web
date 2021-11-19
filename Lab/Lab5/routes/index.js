const homeRouter = require('./home')
const addRouter = require('./add')
const deleteRouter = require('./delete')

function route(app) {
    app.use('/add', addRouter)
    app.use('/delete', deleteRouter)
    app.use('/', homeRouter)
}

module.exports = route
