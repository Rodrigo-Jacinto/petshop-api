let mongodb = require('mongodb');

module.exports = () => {

    var mongoClient = mongodb.connect("mongodb://localhost:27017", {useNewUrlParser: true});

    return {
        mongoClient,
        nomeBD: "petshopbd"
    }
}