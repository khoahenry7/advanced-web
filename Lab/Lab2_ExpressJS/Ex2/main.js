const express = require("express")
const app = express()
const PORT = 3000

// Middle ware handle POST method
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname }) // render view
})

app.post("/login", (req, res) => {
    let h3
    if (!req.body.email) {
        h3 = "Please enter your email address"
    } else if (!req.body.password) {
        h3 = "Please enter your password"
    } else {
        h3 = `<span class="text-success">Login success</span>`
    }

    res.send(`
    <!DOCTYPE html>
    <html lang="en">  
        <head>
            <title>Login</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        </head>
        <body style="font-family: sans-serif">
            <div class="container" style="max-width: 800px; margin: 0 auto; display: flex; 
                    flex-direction: column; justify-content: center; align-items: center;">
                <h2 class="text-info text-center" style="font-weight: 700; margin-top: 25.5px">Login Form</h2>
                <h3 class="text-danger text-success">${h3}</h3>
                <div class="col text-center" style="margin-top: 20px;">
                    <a href="/" class="btn btn-info" style="display: inline-block; margin: 0 auto">Return</a>
                </div>
            </div>
        
        </body>
    </html>`)
})

app.get("/login", (req, res) => {
    res.send(`
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>The GET method is not supported</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        </head>
        <body style="font-family: sans-serif">
            <div class="container" style="max-width: 800px; margin: 0 auto; display: flex; 
                    flex-direction: column; justify-content: center; align-items: center;">         
                <h3 class="text-danger text-danger">The GET method is not supported</h3>
            </div>
        </body>
    </html>`)
})

app.use((req, res) => {
    res.status(404)
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>404 - Not Found</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family: sans-serif; 
        background-image: url('https://cdn.dribbble.com/users/1107612/screenshots/4602580/media/55aa62eb9c519d326014327372d9d12e.png?compress=1&resize=1000x500'); 
        background-repeat: no-repeat; background-color: black; background-size: cover; ">
        </body>
    </html>`)
})

app.listen(PORT)
