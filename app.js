let express = require('express');
let consign = require('consign');

let app = express();

consign({cwd:"src"}).include("config").then('models').then('controllers').then('routes.js').into(app);

