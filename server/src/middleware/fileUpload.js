const multer = require('multer')
const path = require('path')

// กำหนดที่เก็บไฟล์
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null, uniqueName)
    }
})

// จำกัดประเภทไฟล์
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (extname && mimetype) {
        cb(null, true)
    } else {
        cb(new Error('Only images are allowed'))
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = upload
