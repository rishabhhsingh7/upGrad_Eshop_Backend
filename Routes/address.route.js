module.exports = (app) => {
  //import express router
  const router = require("express").Router();

  //import the adress contrllers
  const address = require("../controllers/address.controller");

  //import the middleware function
  const { validateAccessToken } = require("../middleware/auth");

  //POST /address
  router.post("/address", validateAccessToken, address.addAddress);

  //use the router
  app.use("/api", router);
};
