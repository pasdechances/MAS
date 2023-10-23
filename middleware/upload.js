const multer = require('multer');

const IMAGES_MIME_TYPES = [
    "image/png", 
    "image/jpg", 
    "image/jpeg"
];
const DOCUMENTS_MIME_TYPES = [
    "application/pdf", 
];

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '/tmp/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const fileFilter = function (req, file, cb) {
    console.log('toto',file)
    if(file.fieldname == "documents"){
        if (!DOCUMENTS_MIME_TYPES.includes(file.mimetype)) {
            return cb(new Error('Only pdf are allowed'));
        }
        if (file.size > 1024 * 1024 * 15) {
            return cb(new Error('File size exceeds 15 MB'));
        }
    }
    else if(file.fieldname == "images"){
        if (!IMAGES_MIME_TYPES.includes(file.mimetype)) {
            return cb(new Error('Only png, jpg or jpeg are allowed'));
        }
        if (file.size > 1024 * 1024 * 2) {
            return cb(new Error('File size exceeds 2 MB'));
        }
    }
    cb(null, true);
}



const confDocuments = multer({storage: storage, fileFilter: fileFilter }).array('documents', 8); 

const confImages = multer({storage: storage, fileFilter: fileFilter }).array('images', 4);

const confDocument = multer({storage: storage, fileFilter: fileFilter }).single('documents'); 

const confImage = multer({storage: storage, fileFilter: fileFilter }).single('images');

const confMixed = multer({storage: storage, fileFilter: fileFilter }).fields([
    { name: 'images', maxCount: 4 },
    { name: 'documents', maxCount: 4 }
]); 


const uploadMixed = function (req, res, next) {
    confMixed(req, res, function (err) {
        if (err) return res.status(400).send({ message: err.message })
        next();
    })
}

const uploadDocuments = function (req, res, next) {
    confDocuments(req, res, function (err) {
        if (err) return res.status(400).send({ message: err.message })
        next();
    })
}

const uploadImages = function (req, res, next) {
    confImages(req, res, function (err) {
        if (err) return res.status(400).send({ message: err.message })
        next();
    })
}

const uploadOneImage = function (req, res, next) {
    confImage(req, res, function (err) {
        if (err) return res.status(400).send({ message: err.message })
        next();
    })
}

const uploadOneDocument = function (req, res, next) {
    confDocument(req, res, function (err) {
        if (err) return res.status(400).send({ message: err.message })
        next();
    })
}


module.exports = { uploadImages, uploadDocuments, uploadMixed, uploadOneImage, uploadOneDocument }