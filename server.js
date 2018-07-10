const express = require('express');
const	mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const ip = process.env.IP || '127.0.0.1';
const config = require('./config.js');
const app = express();

app.use(cookieParser());

//middleware for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=> {
  res.send('We are now live!')
})

app.listen(port, ip, function(){
	console.log('Magic happens at ' + config.SERVER_URL + '!');
})
