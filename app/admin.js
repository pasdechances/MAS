const express = require('express');
const app = express();
const base = require('../resources/connect.js');
const bodyParser = require('body-parser');
const adminRoutes = require('../routes/admin.js');
const cors = require('cors');

base.connect(global.config.cluster);

var corsOptions = global.config.cors;
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.json({extended: true}));
app.use('/', adminRoutes);

module.exports = app;