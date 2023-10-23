const TokenAction = require('../resources/tokenAction');

const Admin = require('../models/admin');
const Customer = require('../models/customer');

const Models = {
    'admin': Admin,
    'customer': Customer,
}

const auth = function(type, req, res, next) {
    var tokenAction = new TokenAction();
    var userId = tokenAction.decode(req.headers.authorization).userId;

    Models[type].findById(userId).then((user) => {
        if(! user) return res.status(401).json({ err: 'Invalid user not found' });
        if (user.id !== userId) return res.status(401).json({ err: 'Invalid user ID' });
        
        req.auth = {
            userId: user.id,
            type: type
        };
        next();
    })
    .catch(() => {
        return res.status(401).json({ err: 'Invalid request!' });
    })
};

const authAdmin = function(req, res, next) {
    auth("admin", req, res, next);
}

const authCustomer = function(req, res, next) {
    auth("customer", req, res, next);
}


module.exports = { authAdmin, authCustomer }