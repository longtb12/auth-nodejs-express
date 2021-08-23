const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const user = require('./models/UserModel')
const cors = require("cors");


var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));


require("dotenv").config();
var jsonParser = bodyParser.json()

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(MONGODB_URI,{useNewUrlParser : true, useUnifiedTopology : true}).then(()=>{
    console.log('MongoDB connect!')
})
.catch(err => {
    console.log(err);
});

const connect = mongoose.connection;

let routes = require('./routes/routes') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

//app.use('/static', express.static(__dirname+'/images'))

app.listen(PORT,()=>{
    console.log(`Server start at ${PORT}`)
})