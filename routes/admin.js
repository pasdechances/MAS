const express = require('express');
const router = express.Router();

const { authAdmin } = require('../middleware/auth');
const { uploadMixed } = require('../middleware/upload');
const { limiter, limiterConnexion } = require('../middleware/limitor');
const { addEntry } = require('../middleware/history');

const adminCtrl = require('../controllers/admin');
const customerCtrl = require('../controllers/customer');


router.get('/ip', (request, response) => response.send(request.ip))
router.get('/health-check', (request, response) => response.send(true))

router.post('/auth', limiterConnexion, addEntry, adminCtrl.login);

// router.post('/admin', authAdmin, addEntry, adminCtrl.newAdmin);
// router.get('/admin', authAdmin, addEntry, adminCtrl.getAllAdmins);
// router.get('/admin/:idAdmin', authAdmin, addEntry, adminCtrl.getOneAdmin);
// router.put('/admin/:idAdmin', authAdmin, addEntry, adminCtrl.modifyAdmin);
// router.put('/admin/:idAdmin/password', authAdmin, addEntry, adminCtrl.modifyAdminPassword);


// customer
router.post('/customer', authAdmin, addEntry, customerCtrl.newcustomer);
router.get('/customer', authAdmin, addEntry, customerCtrl.getAllcustomers);
router.get('/customer/:idCustomer', authAdmin, addEntry, customerCtrl.getOnecustomer);

module.exports = router;