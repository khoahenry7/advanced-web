const fs = require('fs')
const path = require('path')
const { fileTypes, fileIcons } = require('../helper/helper')

class FileController {
    index(req, res, next) {
        const folder = "public/file_management/" + req.session.username + "/"
        let files = []
        fs.readdirSync(folder).forEach(file => {
            let filePath = path.join(folder + file)

            const extName = path.extname(file)
            let size = fs.statSync(filePath).size
            let mtime = fs.statSync(filePath).mtime
            let lastModified = mtime.getHours() + ":" + mtime.getMinutes() + " " + mtime.getDate() + "-" + mtime.getMonth() + "-" + mtime.getFullYear()
            let fileType = fileTypes[extName]
            let fileIcon = fileIcons[extName]

            const fileObject = {
                name: file,
                extName: extName,
                size: Math.round((size / 1024) * 100) / 100 + " KB",
                lastModified: lastModified,
                type: fileType || "Other File",
                icon: fileIcon || '<i class="fas fa-file"></i>'
            }

            files.push(fileObject)
        })

        res.render('index', {
            name: req.session.name,
            username: req.session.username,
            files: files
        })
    }

    uploadFile(req, res) {
        console.log(req.body)

        res.json({ success: true, message: "send file successful" })
    }
}

module.exports = new FileController()
