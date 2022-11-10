//process the .env file
require("dotenv").config();
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status-codes");

//middleware to generate Acess Token
const generateAccessToken = (payload) => {
  var token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

const validateAccessToken = (req, res, next) => {
  //get the Authorization from the req header which is Define as "Bearer xxxxxxxx........"
  //to valide if Authorization is provided or not
  var token =
    req.get("Authorization") && req.get("Authorization").split(" ")[1];

  //if token is undefined send response unauthorized and ask user to login
  if (token == undefined) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(httpStatus.StatusCodes.UNAUTHORIZED)
      .json({ message: "Please Login first to access this endpoint!" })
      .end();
    return;
  }

  //Else verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //if token is invalid
    if (err) {
      console.log(err);
      res.setHeader("Content-Type", "application/json");
      res
        .status(httpStatus.StatusCodes.FORBIDDEN)
        .json({ message: "Access Denied!" })
        .end();
      return;
    }

    //Else if verfication is successful set request user as the decoded user from the token
    req.user = user;
    //Call the next function to go to the address endpoint.
    next();
  });
};

module.exports = { generateAccessToken, validateAccessToken };
