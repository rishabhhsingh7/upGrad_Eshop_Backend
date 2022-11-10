const db = require("../models");
const Products = db.products;
const httpStatus = require("http-status-codes");
const { products } = require("../models");

//GET all products "/products"
exports.searchProducts = (req, res) => {
  /** **************The request query object contains the following properties*****************
    * 
    1. Category - String
    2. Direction - String (only ASC or DESC)
    3. Name - String
    4. Sort By - String 
    the request url looks like below example:

    http://localhost:8080/products?pageNo=0&pageSize=10&direction=DESC&sortBy=id

    if the values of the above properties are not provided we have to use the default values

    1. Category - “”
    2. Direction - DESC
    3. Name - “”
    4. Sort By - “productId”
    **********************************************************************************************/

  //if direction is DESC i.e descending initialize direction as -1 or else in Ascending -1
  var direction =
    req.query.direction != undefined
      ? req.query.direction === "DESC"
        ? -1
        : 1
      : -1;

  //the properties to be sort if undefined or "" then sortby productId
  var sortName =
    req.query.sortBy != undefined
      ? req.query.sortBy === ""
        ? "productId"
        : req.query.sortBy
      : "productId";

  //define a query object that can take the request data i.e category
  //and name or either one of them or none of them
  var queryData = {};

  if (req.query.category != undefined && req.query.category != "") {
    queryData.category = new RegExp(req.query.category, "i");
  }

  if (req.query.name != undefined && req.query.name != "") {
    queryData.name = new RegExp(req.query.name, "i");
  }

  //if both name and category are undefined search all products
  Products.find(queryData)
    .sort([[sortName, direction]])
    .then((response) => {
      res.setHeader("Content-Type", "application/json");
      res.status(httpStatus.StatusCodes.OK).json(response).end();
    })
    .catch((err) => {
      res.setHeader("Conetent-Type", "application/json");
      res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
    });
};

//Get Product Categories - “/products/categories"
exports.searchProductsCategories = (req, res) => {
  Products.find({})
    .then((products) => {
      //iterate through the list of products and store the category of each in categories array
      var categories = [];
      products.map((element) => {
        categories.push(element.category);
      });

      //send the list of categories to client
      res.setHeader("Content-Type", "application/json");
      res.status(httpStatus.StatusCodes.OK).json(categories).end();
    })
    .catch((err) => {
      //if err
      console.log(err);
      res.setHeader("Content-Type", "application/json");
      res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
    });
};

//Get Product by Product ID - “/products/{id}”
exports.searchProductByID = (req, res) => {
  //Find the products with the given id
  Products.find({ productId: req.params.id })
    .then((product) => {
      if (product == null) {
        res.setHeader("Content-Type", "application/json");
        res
          .status(httpStatus.StatusCodes.NOT_FOUND)
          .json({ message: `No Product found for ID - ${req.params.id}!` })
          .end();
        return;
      }

      //else send the product to the client
      res.setHeader("Content-Type", "application/json");
      res.status(httpStatus.StatusCodes.OK).json(product).end();
    })
    .catch((err) => {
      console.log(err);
      res.setHeader("content-Type", "applicaton/json").json().end();
    });
};

//Save Product - “/products”
exports.saveProduct = (req, res) => {
  /*********************************************************************************
      This end point require Authentication and only admin can access this endpoint,
      after authenticating the user is stored in req.user object
      ********************************************************************************* */

  //check if the request user is Admin
  if (req.user.role !== "admin") {
    res.setHeader("Content-Type", "application/json");
    res
      .status(httpStatus.StatusCodes.UNAUTHORIZED)
      .json({ message: "You are not authorized to access this endpoint!" })
      .end();
    return;
  }

  //else save the product to db
  var data = {
    productId: Math.floor(Math.random() * 100000000),
    name: req.body.name,
    category: req.body.category,
    manufacturer: req.body.manufacturer,
    availableItems: req.body.availableItems,
    price: req.body.price,
    imageURL: req.body.imageURL,
    description: req.body.description,
    updatedAt: Date.now(),
    createdAt: Date.now(),
  };

  Products.insertMany([data])
    .then((response) => {
      res.setHeader("Content-Type", "application/json");
      res.status(httpStatus.StatusCodes.OK).json(response[0]).end();
    })
    .catch((err) => {
      console.log(err);
      res.setHeader("Content-type", "application/json");
      res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
    });
};

// Update Product Details- “/products/{id}”
exports.updateProduct = (req, res) => {
  /*********************************************************************************
      This end point require Authentication and only admin can access this endpoint,
      after authenticating the user is stored in req.user object
      ********************************************************************************* */

  //if the request user is not admin send a forbidden response status
  if (req.user.role !== "admin") {
    res.setHeader("Content-Type", "application/json");
    res
      .status(httpStatus.StatusCodes.UNAUTHORIZED)
      .json({ message: "You are not authorized to access this endpoint!" })
      .end();
    return;
  }

  //define data to be updated and store in UpdateData object
  var updateData = {
    name: req.body.name,
    category: req.body.category,
    availableItems: req.body.availableItems,
    manufacturer: req.body.manufacturer,
    price: req.body.price,
    imageURL: req.body.imageURL,
    description: req.body.description,
    updatedAt: Date.now(),
  };

  //else update the product
  //find and update the product
  Products.findOneAndUpdate({ productID: req.params.id }, updateData, {
    new: true,
  })
    .then((updatedProductData) => {
      res.setHeader("Content-Type", "aplication/json");
      res.status(httpStatus.StatusCodes.OK).json(updatedProductData).end();
    })
    .catch((err) => {
      console.log(err);
      res.setHeader("Content-Type", "application/json");
      res.status(httpStatus.StatusCodes.BAD_REQUEST).json().end();
    });
};

//Delete Product “/products/{id}”
exports.deleteProduct = (req, res) => {
  /*********************************************************************************
      This end point require Authentication and only admin can access this endpoint,
      after authenticating the user is stored in req.user object
      ********************************************************************************* */

  //check if user is not admin
  if (req.user.role !== "admin") {
    res.setHeader("Content-Type", "application/json");
    res
      .status(httpStatus.StatusCodes.FORBIDDEN)
      .json({ message: "You are not authorized to access this endpoint!" })
      .end();
    return;
  }

  //else find the product with given id and delete it
  Products.findOne({ productId: req.params.id })
    .then((product) => {
      if (product == null) {
        res.setHeader("Content-Type", "application/json");
        res
          .status(httpStatus.StatusCodes.BAD_REQUEST)
          .json({ message: `No Product found for ID -${req.params.id}!` })
          .end();
        return;
      }

      //else delete the product
      Products.findOneAndDelete({ productID: req.params.id })
        .then(() => {
          res.setHeader("Content-Type", "application/json");
          res
            .status(httpStatus.StatusCodes.OK)
            .json({
              message: `Product with ID - ${req.params.id} deleted successfully!`,
            })
            .end();
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
