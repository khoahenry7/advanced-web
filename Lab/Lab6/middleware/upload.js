const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/images/avatar')
//     },
//     filename: (req, file, cb) => {
//         cb(null, crypto.createHash('md5').update(Math.random().toString()).digest('hex')
//             + path.extname(file.originalname))
//     }
// })

const upload = multer({ dest: './public/file_management/' })

module.exports = upload