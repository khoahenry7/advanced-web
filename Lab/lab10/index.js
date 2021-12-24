const express = require('express')
const app = express()
const route = require("./routes/index")
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const cookieSession = require('cookie-session')
const MemoryStore = require('session-memory-store')(expressSession)
const path = require('path')
const bodyParser = require('body-parser')
const server = require("http").createServer(app)
var moment = require('moment')
// const io = require("socket.io")(server)
const { Server } = require("socket.io")
const io = new Server(server)
const sharedSession = require("express-socket.io-session")

app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json())
app.use(cookieParser())



app.use(cookieSession({
    secret: 'secret',
    store: new MemoryStore(60 * 60 * 12),
    cookie: { maxAge: 60 * 60 * 1000 },
    saveUninitialized: true
}))

// io.use(sharedSession(cookieSession, {
//     autoSave: true
// }))

app.set('view engine', 'ejs')
// app.use(express.static(path.join(__dirname, 'public')))

// io.on("connection", socket => {
//     console.log("user contected")
// })

route(app)

io.on("connection", function (socket) {
    // socket.on("disconnect", function () {
    // })
    socket.on("onmessage", data => {
        // let time = data.time
        // let t = moment().format(time)
        // console.log(t)
        // console.log(data)
        io.emit("server-sent-message", data)
    })
})

server.listen(3000, (req, res) => {
    console.log("listening on port 3000")
})