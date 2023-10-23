const History = require('../models/history');
// 
// 
// DRAFT
// 
// 
// 

const addEntry = function(req, res, next) {
    var userId = "extern";
    var type = "auth";
    if (req.auth) {
        userId = req.auth.userId
        type = req.auth.type
    }

    History.create({
        date: new Date(),
        userId: userId,
        type: type,
        info: {
            route: req.originalUrl,
            method: req.method
        }
    })
    .catch(() => {
        console.log("history fail to create");
        console.log(history);
    });

    next();
};

// const getOneHistory = (req, res, next) => {
//     History.findOne({
//         _id: req.params.id
//     })
//         .then((history) => {
//             return res.status(200).json(history);
//         })
//         .catch(() => {
//             return res.status(500).json({ error: "history can't be read : hyjs" });
//         });
// };

// const getAllHistory = (req, res, next) => {
//     History.find()
//         .then((historys) => {
//             return res.status(200).json(historys);
//         })
//         .catch(() => {
//             return res.status(500).json({ error: "entries of history can't be read : hyjs" });
//         });
// };

module.exports = { addEntry }