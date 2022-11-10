const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model")(mongoose);
// db.orders = require('./order.model')(mongoose);
// db.products = require('./product.model')(mongoose);
db.addresses = require("./address.model")(mongoose);

module.exports = db;
