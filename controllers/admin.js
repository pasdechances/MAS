const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const TokenAction = require('../resources/tokenAction');
const BodyCheck = require('../resources/bodyCheck');

exports.newAdmin = (req, res, next) => {

    bodyCheck = new BodyCheck(req.body);
    bodyCheck.isEmpty('login');
    bodyCheck.isEmpty('password');

    if (!bodyCheck.isValid()) {
        return res.status(400).json({ error: bodyCheck.errors });
    }

    Admin.findOne({ login: req.body.login }, function (err, admins) {
        if (!admins) {
            Admin.create({
                login: req.body.login,
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


exports.getOneAdmin = (req, res, next) => {
    console.log(req.params.idAdmin)
    Admin.findOne({
        _id: req.params.idAdmin
    })
        .then((admin) => {
            console.log(admin)
            return res.status(200).json(admin);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
};

exports.modifyAdmin = (req, res, next) => {
    var newValues = {
        $set: { login: req.body.login }
    };
    Admin.updateOne(
        { _id: req.params.idAdmin },
        newValues
    )
        .then(() => {
            return res.status(200).json({ message: 'Admin updated successfully!' });
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
};

exports.modifyAdminPassword = (req, res, next) => {
    var newValues = {
        $set: { password: bcrypt.hashSync(req.body.password, global.config.saltRounds) }
    };
    Admin.updateOne(
        { _id: req.params.idAdmin },
        newValues
    )
        .then(() => {
            return res.status(200).json({ message: 'Admin password updated successfully!' });
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
};

exports.getAllAdmins = (req, res, next) => {
    Admin.find()
        .then((admins) => {
            return res.status(200).json(admins);
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
};

exports.login = (req, res, next) => {
    var tokenAction = new TokenAction();

    Admin.findOne({ login: req.body.login })
        .then(admin => {
            if (!admin) {
                return res.status(403).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, admin.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(400).json({ error: 'Mot de passe incorrect !' });
                    }
                    return res.status(200).json({
                        id: admin._id,
                        token: tokenAction.sing(admin._id)
                    });
                })
                .catch(() => {
                    return res.status(500).json({ error: "Wrong Password" });
                });
        })
        .catch(() => {
            return res.status(500).json({ error: "Wrong Admin" });
        });
};

// exports.disconnect = (req, res, next) => {
//   return res.status(200).json({message : "disconnected"})
// }