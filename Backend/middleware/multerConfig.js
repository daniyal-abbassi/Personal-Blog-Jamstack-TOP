const multer = require('multer');

const storage = multer.diskStorage({
    filename: (req,file,callback) => {
        callback(null,file.originalname)
    }
})

module.exports=multer({storage})