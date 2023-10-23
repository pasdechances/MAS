const express = require('express');
const app = express();
const base = require('../resources/connect.js');
const bodyParser = require('body-parser');
const customerRoutes = require('../routes/customer.js');
const cors = require('cors');

base.connect(global.config.cluster);

var corsOptions = global.config.cors;
app.use(cors(corsOptions));
//app.set('trust proxy', 1);
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.json({extended: true}));
app.use('/', customerRoutes);

module.exports = app;