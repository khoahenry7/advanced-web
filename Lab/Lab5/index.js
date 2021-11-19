const express = require('express')
const app = express()
const port = 3000
const route = require('./routes/index')
const bodyParser = require('body-parser')

require('ejs')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

route(app)

app.listen(port, () => {
    console.log("listening on port " + port)
})