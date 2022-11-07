const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model")(mongoose);
// db.user = require('./order.model')(mongoose);
// db.user = require('./product.model')(mongoose);
// db.user = require('./address.model')(mongoose);

module.exports = db;
