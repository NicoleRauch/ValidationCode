// This code is based on https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
//
// server.js

// BASE SETUP
// =============================================================================

// load the packages we need
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { networkInterfaces } = require('os');

const app = express();                 // define our app using express
const FILE = path.join(__dirname, 'users.json');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());

app.set('port', process.env.PORT || 5555);        // set our port

// MIDDLEWARE for accessing the server from other servers
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:5555/api)
router.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

router.get('/users', function(req, res, next) {
  fs.readFile(FILE, function(err, data) {
    if (err || !data) { return next(err); }

    res.json(JSON.parse(data));
  });
});

router.post('/user', function(req, res, next) {
  fs.readFile(FILE, function(err, data) {
    if (err || !data) { return next(err); }
    var users = JSON.parse(data);
    users.push({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    fs.writeFile(FILE, JSON.stringify(users), function(err) {
      if (err) { return next(err); }
      res.json({message: "User successfully added."});
    });
  });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
    if (net.family === familyV4Value && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
    }
  }
}
app.listen(app.get('port'), function () {
  console.log('Connect to the server via http://localhost:' + app.get('port'));
  console.log("or via IP address(es):", JSON.stringify(results));
});
