const mongoose = require('mongoose')

exports.connect = (cluster) => {

console.log(cluster.uri)
    mongoose.connect(cluster.uri,cluster.call)
    .then(() => {
        console.log('Connexion à MongoDB réussie !')
        return 1;
    })
    .catch((err) => {
        console.log('Echec de connexion à MongoDB')
        throw err;
    });
}