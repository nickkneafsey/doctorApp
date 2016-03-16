var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');
var express = require('express');
var app = express();
// var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var clinicalController = require('./controllers/clinicalController')
require('dotenv').load();

// app.use(cors());


app.use(function(req,res,next) {  
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3232/");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept, x-www-form-urlencoded, json, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);

  // res.setHeader("Access-Control-Expose-Headers", "Authorization");
  return next()
});

app.use(express.static('client'));
app.use(passport.initialize());

app.use(session({
  secret: "secretttt",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.session());



app.set('port', (process.env.PORT || 3232));

var server = app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// app.use(bodyParser.json());

passport.serializeUser(function(user, done) {
  console.log("USER", user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("OBJ", obj);
  done(null, obj);
});

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://drchrono.com/o/authorize/?redirect_uri=http%3A//localhost%3A3232/auth/drchrono/callback&response_type=code&client_id=H5suPDLh4GSfODi4xCYNYtGRsLUeiRMngZ2CJ0kZ',
    tokenURL: 'https://drchrono.com/o/token/',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    client_secret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3232/auth/drchrono/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var obj = {}
    obj['accessToken'] = accessToken;
    done(null, obj);
  }
));

//Authentication

app.get('/auth/drchrono',
  passport.authenticate('oauth2'));

app.get('/auth/drchrono/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/#/token');
  }
);

//token page routes
app.get('/access', function(req, res) {
  res.send(req.session.passport.user.accessToken);
});

app.get('/api/doctors', clinicalController.handleRoute);

//clinical routes


//Home page routes
app.get('/api/clinicalNotesTemplate', clinicalController.handleRoute);
app.get('/api/patients', clinicalController.handleRoute);
app.get('/api/clinicalNotes', clinicalController.handleRoute);

//Patient Page routes
app.get('/api/patient/:id', clinicalController.handleRoute);
app.get('/api/chart/:id', clinicalController.handleRoute);
app.get('/api/appointment/:id', clinicalController.handleRoute)



