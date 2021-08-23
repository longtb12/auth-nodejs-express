const jwt = require("jsonwebtoken");
require("dotenv").config();

verifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1] ;
  if (token == null) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
