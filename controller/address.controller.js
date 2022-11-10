const db = require("../models");
const Addresses = db.addresses;
const httpStatus = require("http-status-codes");
const {
  validateZipCode,
  validateContact,
} = require("../middleware/validation");

exports.addAddress = (req, res) => {
  //After authenticating the user we store all the information to db

  //validate the zip code
  if (!validateZipCode(req.body.zipCode)) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(httpStatus.StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid zip code!" })
      .end();
    return;
  }

  //validate Contact number
  if (!validateContact(req.body.contactNumber)) {
    res.setHeader("Conetent-Type", "application/json");
    res
      .status(httpStatus.StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid contact number!" })
      .end();
  }

  //ELSE
  //delete any address that is that has same properties as request properties
  Addresses.findOneAndDelete({
    name: req.body.name,
    contactNumber: req.body.contactNumber,
    city: req.body.city,
    state: req.body.state,
    landmark: req.body.landmark,
    street: req.body.street,
    zipCode: req.body.zipCode,
    user: { _id: req.user._id },
  })
    .then((response) => {
      var addressData = {
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        city: req.body.city,
        state: req.body.state,
        landmark: req.body.landmark,
        street: req.body.street,
        zipCode: req.body.zipCode,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        user: { _id: req.user._id },
      };

      //insert the data to database
      Addresses.insertMany([addressData])
        .then((response) => {
          var data = {
            _id: response[0]._id,
            name: response[0].name,
            contactNumber: response[0].contactNumber,
            street: response[0].street,
            landmark: response[0].landmark,
            city: response[0].city,
            state: response[0].state,
            zipcode: response[0].zipCode,
            createdAt: response[0].createdAt,
            updatedAt: response[0].updatedAt,
            user: req.user,
          };
          res.setHeader("Content-Type", "application/json");
          res.status(httpStatus.StatusCodes.OK).json(data).end();
        })
        .catch((err) => {
          console.log(err);
          res.setHeader("Content-Type", "application/json");
          res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
    });
};
