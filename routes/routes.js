"use strict";

module.exports = function (app) {
  let userCtrl = require("../controller/UserController");
  let verifyToken = require('../middlewares/verifyToken');

  // todoList Routes
  app.route("/user/login")
    .post(userCtrl.login);

  app.post("/user/register",
          userCtrl.register);
};
