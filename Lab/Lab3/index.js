const express = require('express')
const app = express()
const route = require('./routes')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const methodOverride = require('method-override')
const db = require('./server/server')
const port = process.env.PORT || 3000
require('ejs')
require('dotenv').config()

// connect to db
db.connect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"));
app.use(cookieParser())
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}))

// custom method 
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')

route(app)

app.listen(port, () => {
    console.log('listening on port ' + port)
})