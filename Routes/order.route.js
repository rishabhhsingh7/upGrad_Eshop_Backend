const { validateAccessToken } = require("../middleware/auth");

module.exports = (app) => {
  //import the order controller and store it in varible order
  const order = require("../controllers/order.controller");

  //import the express Router
  const router = require("express").Router();

  //POST /orders
  //to access this endpoint requires authentication
  router.post("/orders", validateAccessToken, order.saveOrder);

  //use the router
  app.use("/api", router);
};
