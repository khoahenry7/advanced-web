const http = require('http')
const URL = require('url')
const queryString = require('querystring')
const PORT = 8888

http.createServer((req, res) => {
    let url = URL.parse(req.url)
    if (url.pathname == '/') {
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <title>Exercise 1</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        </head>
        
        <body style="font-family: sans-serif">
            <div class="container"
                style="max-width: 400px; height: 300px; margin-top: 20px; margin: 0 auto; display: flex; 
                flex-direction: column; justify-content: center; align-items: center;">
                <h2 class="text-info text-center" style="font-weight: 700;">Basic Calculating</h2>
                <form action="result" style="max-width: 300px; margin-top: 20px; padding-bottom: 20px; 
                border: 2px solid #CFB784; padding: 30px; border-radius: 4px">
                    <div class="form-group" style="display: flex; align-items: center; justify-content: space-between">
                        <label for="number-1">Số hạng 1:</label>
                        <input class="form-control" type="number" id="number-1" name="num1" style="width: 60%;">
                    </div>
                    <div class="form-group" style="display: flex; align-items: center; justify-content: space-between">
                        <label for="number-2">Số hạng 2:</label>
                        <input class="form-control" type="number" id="number-2" name="num2" style="width: 60%;">
                    </div>
                    <div class="form-group" style="display: flex; align-items: center; justify-content: space-between">
                        <label for="select">Phép tính:</label>
                        <select class="form-control" id="select" style="width: 60%;" name="operator">
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="*">*</option>
                            <option value="/">/</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-warning">Submit</button>
                </form>
            </div>
        
        </body>
        
        </html>
        `)
    } else if (url.pathname == "/result") {
        let query = queryString.decode(url.query)
        let { num1, num2, operator } = query
        let h3;
        if (!num1) {
            h3 = `<span class="text-danger">Vui lòng nhập Số hạng 1</span>`
        } else if (!num2) {
            h3 = `<span class="text-danger">Vui lòng nhập Số hạng 2</span>`
        } else if (!operator) {
            h3 = `<span class="text-danger">Vui lòng chọn một Phép tính</span>`
        } else {
            num1 = parseInt(num1)
            num2 = parseInt(num2)
            let result;

            switch (operator) {
                case "+":
                    result = num1 + num2
                    operator = "+"
                    break
                case "-":
                    result = num1 - num2
                    operator = "-"
                    break
                case "*":
                    result = num1 * num2
                    operator = "*"
                    break
                case "/":
                    result = num1 / num2
                    operator = "/"
                    break
            }

            h3 = `Kết quả của phép tính: <span class="text-success" style="font-weight: 700"><br>${num1} ${operator} ${num2} = ${result}</span>`
        }

        res.end(`<!DOCTYPE html>
        <html lang="en"> 
        <head>
            <title>Exercise 1</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        </head>
        <body style="font-family: sans-serif">
            <div class="container" style="max-width: 400px; height: 300px; margin: 0 auto;">
                <h2 class="text-info text-center" style="font-weight: 700; margin-top: 6px;">Basic Calculating</h2>
                <h3 class="text-warning text-center">${h3}</h3>
                <div class="col text-center" style="margin-top: 20px;">
                    <a href="/" class="btn btn-success" style="display: inline-block; margin: 0 auto">Quay lại</a>
                </div>
            </div>
        </body>
        </html>`)
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
    console.log("Sever is running")
})

