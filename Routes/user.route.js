module.exports = (app) => {
  //import express router
  const router = require("express").Router();
  //import the controller
  const user = require("../controllers/user.controller.js");

  //POST /auth/signup
  router.post("/auth/signup", user.signUp);

  //POST /auth/login
  router.post("/auth/login", user.login);

  //use the router
  app.use("/api", router);
};
