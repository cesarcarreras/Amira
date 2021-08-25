const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

//Connect back with Cloudinary:
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    //secure: true
});

//Configure storage on Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
        return{
            folder: 'Chip',
            //caps may affect
            allowedFormats: ['png', 'jpg', 'PDF', 'pdf'],
            //File validation:
            fileFilter: function(req, file, cb){
                if(!file.originalname.match(/\.(pdf|jpg|png)$/)){
                    return cb(new Error('Archivo no válido'))
                }
                cb(null, file.originalname)
            },
            public_id: `app-${file.originalname}`
        }
    }
})

const uploadCloud = multer({storage});

module.exports = uploadCloud;