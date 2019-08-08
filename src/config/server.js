let cors = require('cors');
let bodyParser = require('body-parser');

module.exports = app => {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.listen(process.env.PORT || 3001);
}