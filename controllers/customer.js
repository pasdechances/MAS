const bcrypt = require('bcrypt');
const Path = require('path');
const TokenAction = require('../resources/tokenAction');
const BodyCheck = require('../resources/bodyCheck');


exports.newCustomer = (req, res, next) => {

    bodyCheck = new BodyCheck(req.body);
    bodyCheck.isEmpty('mail');
    bodyCheck.isEmpty('password');

    if (!bodyCheck.isValid()) {
        return res.status(400).json({ error: bodyCheck.errors });
    }

    Customer.findOne({ mail: req.body.mail }, function (err, customers) {
        if (!customers) {
            Customer.create({
                mail: req.body.mail,
                password: bcrypt.hashSync(req.body.password, global.config.saltRounds)
            })
                .then((data) => {
                    return res.status(201).json(data);
                })
                .catch((err) => {
                    return res.status(500).json({ error: err });
                });
        } else {
            return res.status(403).json({ message: 'User already exist' });
        }
    });
};


exports.getOneCustomer = (req, res, next) => {
    console.log(req.params.idCustomer)
    Customer.findOne({
        _id: req.params.idCustomer
    })
        .then((customer) => {
            console.log(customer)
            return res.status(200).json(customer);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
};

exports.modifyCustomer = (req, res, next) => {
    var newValues = {
        $set: { mail: req.body.mail }
    };
    Customer.updateOne(
        { _id: req.params.idCustomer },
        newValues
    )
        .then(() => {
            return res.status(200).json({ message: 'Customer updated successfully!' });
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
};

exports.modifyCustomerPassword = (req, res, next) => {
    var newValues = {
        $set: { password: bcrypt.hashSync(req.body.password, global.config.saltRounds) }
    };
    Customer.updateOne(
        { _id: req.params.idCustomer },
        newValues
    )
        .then(() => {
            return res.status(200).json({ message: 'Customer password updated successfully!' });
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
};

exports.getAllCustomers = (req, res, next) => {
    Customer.find()
        .then((customers) => {
            return res.status(200).json(customers);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
};

exports.login = (req, res, next) => {
    var tokenAction = new TokenAction();

    Customer.findOne({ mail: req.body.mail })
        .then(customer => {
            if (!customer) {
                return res.status(403).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, customer.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(400).json({ error: 'Mot de passe incorrect !' });
                    }
                    return res.status(200).json({
                        id: customer._id,
                        token: tokenAction.sing(customer._id)
                    });
                })
                .catch(() => {
                    return res.status(500).json({ error: "Wrong Password" });
                });
        })
        .catch(() => {
            return res.status(500).json({ error: "Wrong Customer" });
        });
};

// exports.disconnect = (req, res, next) => {
//   return res.status(200).json({message : "disconnected"})
// }