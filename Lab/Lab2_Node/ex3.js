const http = require("http")
const URL = require("url")
const PORT = 8888

let studentList = new Array()

http.createServer((req, res) => {
    let url = URL.parse(req.url)
    let pattern = /^\/students\/\d+$/g
    // let id = "\/\d+$/g"
    if (url.pathname == "/") {
        res.end("home page")
    } else if (url.pathname == "/students") {
        if (req.method == "GET") {
            res.end(JSON.stringify(studentList))
        } else if (req.method == "POST") {
            let body = "";
            req.on("data", data => {
                body += data;
            });

            req.on("end", () => {
                let { name, age } = JSON.parse(body)
                let json = {
                    id: studentList.length + 1,
                    name: name,
                    age: age
                }
                studentList.push(json)
                res.end("Add Student " + JSON.stringify(json) + " successful")
            })
        }
    } else if (url.pathname.match(pattern)) {
        let urlPattern = "" + url.pathname.match(pattern); //object
        let id = parseInt(urlPattern.replace("/students/", ""))

        if (req.method === 'GET') {
            let checkId = false;
            studentList.findIndex(student => {
                if (student.id === id) {
                    res.end(JSON.stringify(student))
                    checkId = true
                }
            })
            if (!checkId) res.end(`Student has id = ${id} not found`)
        } else if (req.method == 'PUT') {
            let body = "";
            let notification = "Can not find id: " + id;
            req.on("data", data => {
                body += data
            })

            req.on("end", () => {
                let { name, age } = JSON.parse(body)
               
                studentList.forEach(student => {
                    if (student.id === id) {
                        student.name = name
                        student.age = age
                        notification = "Update success"
                    }
                })

                res.end(notification)
            })
        } else if (req.method == 'DELETE') {
            let notification = "Can not find id: " + id;
            
            let idx = studentList.findIndex(student => student.id === id)

            if (idx >= 0) {
                studentList.splice(idx, 1)
                notification = "Delete student id: " + id + " successful"
            } 
            
            res.end(notification)
        } 
    } else {
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>404 - Not Found</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body style="background-image: url('https://cdn.dribbble.com/users/1107612/screenshots/4602580/media/55aa62eb9c519d326014327372d9d12e.png?compress=1&resize=1000x500'); 
            background-repeat: no-repeat; background-color: black; background-size: cover; ">
            </body>
        </html>`)
    }
}).listen(PORT, () => {
    console.log("Server is running")
})
