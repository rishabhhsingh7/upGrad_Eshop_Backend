require("dotenv").config();
const db = require("../models");
const mongoose = require("mongoose");
const httpStatus = require("http-status-codes");
const bcrypt = require("bcrypt");
const { atob } = require("b2a");
const jwt = require("jsonwebtoken");
const secret = "my secret";
const Users = db.users;

//function to validate the email return true if valid and false otherwise
const validateEmail = (email) => {
  //regex for validating email
  const regx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,6})/;
  var result = regx.test(email);
  return result;
};

//function to validate the user's phone number
const validateContact = (contact) => {
  //regex for validating phone number
  const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  return regex.test(contact);
};

exports.signUp = (req, res) => {
  //validate the email
  var isEmailValid = validateEmail(req.body.email);
  if (!isEmailValid) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(httpStatus.StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid email-id format!" })
      .end();
    return;
  }

  //validate phone number
  if (!validateContact(req.body.contactNumber)) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(httpStatus.StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid contact number!" })
      .end();
    return;
  }

  //find user by email if user is there then say user exists send
  Users.find({ email: req.email })
    .then((result) => {
      if (result.length != 0) {
        res.setHeader("Content-Type", "application/json");
        res
          .status(httpStatus.StatusCodes.FORBIDDEN)
          .json({
            message: "Try any other email, this email is already registered!",
          })
          .end();
        return;
      }

      //else insert user to data base
      const data = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        contact: req.body.contactNumber,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      //check if role Admin is provided
      if (req.body.role != undefined) {
        data.role = req.body.role;
      }

      //bcrypt the password before storing to db
      bcrypt
        .hash(data.password, 10)
        .then((hashPassword) => {
          data.password = hashPassword;

          //count users already in db
          Users.countDocuments({}).then((count) => {
            //assign user id as count++
            data.id = ++count;

            //insert data to db
            Users.insertMany([data])
              .then((userData) => {
                res.setHeader("Content-Type", "application/json");
                res.status(httpStatus.StatusCodes.OK).json(userData[0]).end();
              })
              .catch((err) => {
                //if error occurs while saving user to db
                res.setHeader("Content-Type", "application/json");
                res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
              });
          });
        })
        .catch((err) => {
          //handle error while encrypting password
          res.setHeader("Content-Type", "applicatin/json");
          res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
        });
    })
    .catch((err) => {
      //handle error while finding user with email if any
      res.setHeader("Content-Type", "applicatin/json");
      res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
    });
};

// POST /auth/login
exports.login = (req, res) => {
  console.log(req.body.password);
  //decrypt th encoded password from b2a
  var password = atob(req.body.password);

  Users.find({ email: req.body.email })
    .then((response) => {
      if (response.length == 0) {
        res.setHeader("Content-Type", "application/json");
        res
          .status(httpStatus.StatusCodes.UNAUTHORIZED)
          .json({ message: "This email has not been registered!" })
          .end();
        return;
      }

      //else compare the request password and the password store in the db
      bcrypt
        .compare(password, response[0].password)
        .then((result) => {
          if (!result) {
            //if password is incorrect
            res.setHeader("Content-Type", "application/json");
            res
              .status(httpStatus.StatusCodes.FORBIDDEN)
              .json({ message: "Invalid Credentials!" })
              .end();
          } else {
            //password entered match correctly
            //generate token
            //define the payload as user.email
            var user = {
              email: response[0].email,
            };
            var token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

            //set the response header x-auth-token
            res.setHeader("Content-Type", "application/json");
            res.setHeader("x-auth-token", token);
            res
              .status(200)
              .json({
                email: response[0].email,
                name: response[0].first_name + " " + response[0].last_name,
                isAuthenticated: true,
              })
              .end();
          }
        })
        .catch((err) => {
          //if err while comparing password
          console.log(err);
          res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
        });
    })
    .catch((err) => {
      //if any err
      console.log(err);
      res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json().end();
    });
};
