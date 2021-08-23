"use strict";

const UserModel = require("../models/UserModel");
const hashSHA = require("../middlewares/hashSHA256");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  login: (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    UserModel.find({ email: email }, (err, result) => {
      if (err) console.log("error:" + err);
      var passwordInput = hashSHA(password);
      if (result[0].password === passwordInput) {
        var token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);

        res.status(200).json({success: true ,token: token, user: result[0] });
      } else {
        res.status(400).send("Fail login");
      }
    });
  },

  register: (req, res) => {
    UserModel.findOne({email:req.body.email},(err,result)=>{
      if(err) return res.status(404).json({success:false,title:'Not Found'})
      if(result == null){
        var userNew = new UserModel({
          email: req.body.email,
          password: hashSHA(req.body.password),
          name: req.body.name,
          phoneNumber: req.body.phoneNumber,
        });
    
        UserModel.create(userNew, (err, result) => {
          if(err) res.status(404).json({success:false,title:'Error:'+err})
          res.status(200).json({success:true,title:'Insert success'})
        });
      }
      else{
        res.status(400).json({success:false,title:'Email exist!'})
      }
    })


    
  },
};
