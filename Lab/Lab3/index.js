const express = require('express')
const app = express()
require('ejs')
const route = require('./routes')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
require('dotenv').config()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("public"));

app.use(cookieParser())
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}))

app.set('view engine', 'ejs')

route(app)

app.listen(port, () => {
    console.log('listening on port ' + port)
})