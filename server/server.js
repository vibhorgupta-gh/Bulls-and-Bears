const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8080;
const passport = require('passport');
const config = require('./config.js');
const app = express();
var cors = require('cors')
var cron = require('cron');

app.use(cors({
  methods: ['GET', 'POST'],
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(session({
  secret: 'bnbisgoodbnbisgood',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000000
  }
}));
// session secret
app.use(passport.initialize());
app.use(passport.session());
require('./auth/social')(app, passport);


app.use(cookieParser());
// persistent login sessions
//middleware for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//connect to mongoose db
mongoose.connect(config.SECRETS.database.url, {
  useNewUrlParser: true
});
//on connected
mongoose.connection.on('connected', () => console.log('connected to database :)'));
//on error
mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('error is ' + err + config.SECRETS.database.url);
  }
});
// let job = require('./utils/random_effect')(cron);
// let job4 = require('./utils/newsPublish')(cron);
// let job3 = require('./utils/neweffect')(cron);
// let job1 = require('./utils/highnew_impact')(cron);
// let job2 = require('./utils/newdepublisher')(cron);

require('./routes/routes')(app, passport)
require('./routes/admin')(app, passport)

app.get('/', (req, res) => res.status(200).send('We are now live!'))

//app.get('*', (req, res) => res.status(404).send('Out of Bounds!'))

app.use((err, req, res, next) => res.status(500).send('Internal server error!'))

app.listen(port, () => console.log('Magic happens at port ' + port + '!'))

module.exports = app;
