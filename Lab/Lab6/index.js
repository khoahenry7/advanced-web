const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const route = require("./routes/index")
const bodyParser = require("body-parser")
const db = require('./server/server')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const path = require('path')
require("ejs")

app.use("/public", express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}))

db.connect()

route(app)

app.listen(port, function () {
    console.log("listening on port " + port)
})