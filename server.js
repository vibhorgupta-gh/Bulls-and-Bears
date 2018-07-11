const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const ip = process.env.IP || '127.0.0.1';
const passport = require('passport');
const config = require('./config.js');
const route = require('./routes');
const app = express();
//const controller =require('./controller');//for routes page
app.use(session({ secret: 'bnbisgood' }));
 // session secret
app.use(passport.initialize());
app.use(passport.session());
require('./auth/facebooklogin')(app,passport);
 // pass passport for configuration

app.use(cookieParser());
// persistent login sessions
//middleware for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api',route);
//connect to mongoose db
mongoose.connect(config.SECRETS.database.url);
//on connected
mongoose.connection.on('connected',()=>{
    console.log('connected to database :)');
});
//on error
mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log('error is ' + err+config.SECRETS.database.url);
    }
});

//routes
//controller(app);
app.use('/',route);

app.listen(port, ip, function(){
	console.log('Magic happens at ' + config.SERVER_URL + '!');
});
