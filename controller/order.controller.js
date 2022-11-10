//import the order model from db
const db = require("../models");
const Orders = db.orders;
const Products = db.products;
const Addresses = db.addresses;

const httpStatus = require("http-status-codes");

//declaring the saveOrder api
exports.saveOrder = (req, res) => {
  /*********************************************************************************
      This end point require Authentication and any user can access this endpoint,
      after authenticating the user is stored in req.user object
      ********************************************************************************* */

  //declare a order object to be returned to client
  var order = {};

  //store the user
  order.user = req.user;

  //store the order date
  order.orderDate = Date.now();

  //find the products
  Products.find({ productId: req.body.productId })
    .then((product) => {
      //if the product id does not exists
      if (product == null) {
        res.setHeader("Content-Type", "application/json");
        res
          .status(httpStatus.StatusCodes.NOT_FOUND)
          .json({
            message: `No Product found for ID - <${req.body.productId}>!`,
          })
          .end();
        return;
      }

      //check if the product is out of stock
      if (product.availableItems === 0) {
        res.setHeader("Content-Type", "application/json");
        res
          .status(httpStatus.StatusCodes.NOT_FOUND)
          .json({
            message: `Product with ID - <${req.body.productId}> is currently out of stock!`,
          })
          .end();
        return;
      }
      //else store the product and calculate price
      order.product = product;
      order.amount =
        product.price * req.body.quantity == undefined ? 1 : req.body.quantity;

      //find the user Shipping address
      Addresses.findOne({ _id: req.body.addressId })
        .then((address) => {
          //if given id address does not exists
          if (address == null) {
            res.setHeader("Content-Type", "application/json");
            res
              .status(httpStatus.StatusCodes.NOT_FOUND)
              .json({
                message: `No Address found for ID - <${req.body.addressId}>!`,
              })
              .end();
            return;
          }

          //store the shipping address
          order.shippingAddress = address;

          Orders.insertMany([
            {
              userId: req.user._id,
              productId: order.product.productId,
              addressId: order.shippingAddress._id,
              amount: order.amount,
              orderDate: order.orderDate,
            },
          ])
            .then(() => {
              res.setHeader("Content-Type", "application/json");
              res.status(httpStatus.StatusCodes.OK).json(order).end();
            })
            .catch((err) => {
              console.log(err);
              res.setHeader("Content-Type", "application/json");
              res
                .status(httpStatus.StatusCodes.BAD_REQUEST)
                .json({ message: "Bad Request" })
                .end();
            });
        })
        .catch((err) => {
          console.log(err);
          res.setHeader("Content-Type", "application/json");
          res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
        });
    })
    .catch((err) => {
      console.log(err);
      res.setHeader("Content-Type", "application/json");
      res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
    });
};
