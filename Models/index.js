const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");

//defining the Data Base object
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
//defining all the db collections used
db.users = require("./user.model")(mongoose);
db.orders = require("./order.model")(mongoose);
db.products = require("./product.model")(mongoose);
db.addresses = require("./address.model")(mongoose);

//exports the db object
module.exports = db;
