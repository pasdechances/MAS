const express = require('express');
const router = express.Router();

const { authCustomer } = require('../middleware/auth');
const { uploadImages, uploadDocuments, uploadOneImage, uploadOneDocument } = require('../middleware/upload');
const { limiter, limiterConnexion } = require('../middleware/limitor');
const { addEntry } = require('../middleware/history');
const customerCtrl = require('../controllers/customer');


router.get('/ip', limiter, (request, response) => response.send(request.ip))
router.get('/health-check', (request, response) => response.send(true))

router.post('/auth', limiterConnexion, customerCtrl.login);

router.post('/', limiter, customerCtrl.newCustomer);
// router.get('/profile', authCustomer, addEntry, customerCtrl.getMyProfile);
// router.put('/profile', authCustomer, addEntry, customerCtrl.modifyProfile);
// router.post('/profile/picture', authCustomer, addEntry, uploadOneImage, customerCtrl.updatePicture);
// router.post('/profile/doc', authCustomer, addEntry, uploadOneDocument, customerCtrl.updateDocument);
// router.get('/profile/picture/:idImg', authCustomer, addEntry, customerCtrl.getPicture);
// router.get('/profile/doc/:idDoc', authCustomer, addEntry, customerCtrl.getDoc);




module.exports = router;