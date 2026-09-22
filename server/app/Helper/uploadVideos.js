const path = require('path');
const fs = require('fs');
const multer = require('multer');

const VIDEO_TYPE_MAP = {
    'video/mp4': 'mp4',
    'video/mkv': 'mkv',
    'video/avi': 'avi',
    'video/mov': 'mov'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = VIDEO_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid video type');
       
        if (!isValid) {
            return cb(new Error('Invalid video type. Only mp4, mkv, avi and mov are allowed'), false);
        }
    
        // ensure 'videos' directory exists
        const uploadPath = 'videos';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-').split('.')[0];
        const extension = VIDEO_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const videoUpload = multer({ storage: storage });

module.exports = videoUpload;
