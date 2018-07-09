var express    = require("express");
 	mongoose   = require("mongoose");
 	bodyParser = require("body-parser");
 	app        =  express();


app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT , process.env.IP , function(){
	console.log("SERVER HAS STARTED");
})