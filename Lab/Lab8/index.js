const express = require('express')
const app = express()
const route = require("./routes/index")
const server = require('./server/server')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

// app.use("/public", express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}))

server.connect()

route(app)

app.listen(3000, function () {
    console.log("listening on port 3000")
})