const express    = require("express");
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");
const app        = express();
var port       = process.env.PORT||3000;
var ip         = process.env.IP||'localhost';


app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port , ip , function(){
	console.log("SERVER HAS STARTED \nIP address : ",ip ,"\nlistening on Port : ",port);
});