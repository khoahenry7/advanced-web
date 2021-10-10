const express = require("express")
const app = express()
const port = 3000
let studentList = new Array()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <form action="students" method="POST">
                <input type="text=" placeholder="Please enter name" name="name">
                <input type="text" placeholder="Please enter age" name="age">
                <button type="submit">Enter</button>
            </form>
        </body>
    </html>
    `)
})

app.get("/students", (req, res) => {
    res.send(studentList)
})

app.post("/students", (req, res) => {
    let json = {
        id: studentList.length + 1,
        name: req.body.name,
        age: req.body.age
    }

    studentList.push(json)
    // res.send(studentList)
    res.send("Add Student " + JSON.stringify(json) + " successful")
})

app.get("/students/:id", (req, res) => {
    studentList.forEach(student => {
        if (student.id == req.param("id")) {
            res.send(student)
        }
    })

    res.send("Can not find student")
})

app.put("/students/:id", (req, res) => {
    studentList.forEach(student => {
        if (student.id == req.param("id")) {
            student.name = req.body.name
            student.age = req.body.age
        }
    })

    res.send("Update successful")
})

app.delete("/students/:id", (req, res) => {
    let count = 0
    studentList.forEach(student => {
        if (student.id == req.param("id")) {
            studentList.splice(count, 1)
        }
        count++
    })

    res.send("Delete successful")
})

app.use((req, res) => {
    res.type("text/plain")
    res.status(404)
    res.send("404 - Not Found")
})

app.listen(port, () => {
    console.log("Server running on port " + port)
})