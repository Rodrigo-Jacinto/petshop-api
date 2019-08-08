let mongodb = require('mongodb');

module.exports = () => {

    var mongoClient = mongodb.connect("mongodb+srv://petshop:wbop123@cluster0-n3ed0.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});

    return {
        mongoClient,
        nomeBD: "petshopbd"
    }
}