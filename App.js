//creating an express object
const express = require("express");
const app = express();
const httpStatus = require("http-status-codes");
bodyParser = require("body-parser");
const cors = require("cors");

//using the cors middleware the port that the frontend would run is 3000
const corsOption = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOption));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(httpStatus.StatusCodes.OK).send("Welcome to upGrad-E-Shop");
});

//HANDLING ALL USER ROUTES
require("./routes/user.routes")(app);

//HANDLING ALL ADDRESS ROUTES
require("./routes/address.routes")(app);

//exports the app module
module.exports = app;
