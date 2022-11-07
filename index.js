const express = require("express");
const app = express();
const httpStatus = require("http-status-codes");
bodyParser = require("body-parser");
const cors = require("cors");

//using the cors middleware
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

//create a mongoose object and conncted to it
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./routes/user.routes")(app);

//deining the port to be used is 8000
const port = 8000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

//exports the app module for testing
module.exports = app;
