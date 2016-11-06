'use strict';
const express = require('express');
var db = require('./db');

// define application basics
var app = express();
var _port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.set('port', _port);
if(!!process.env.OPENSHIFT_NODEJS_IP) {
	var _addr = process.env.OPENSHIFT_NODEJS_IP;
	app.set('addr', _addr);
}
// setup parsing of incoming requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// setup session storage
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
  name:'vc-market',
  secret: 'ANARCHYANONYMOUS',
  resave: true,
  saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: db.connection })
}));
// setup api
var api = require('./main');
api.init(app, db);
// start application when DB is ready
db.connection.on('connected', function () {
	console.log('Mongoose default connection open to ' + db.dbURI);
	if(!!app.get('addr')) {
		app.listen(app.get('port'), app.get('addr'), function () {
			console.log(`Express app listening on ${app.get('addr')}:${app.get('port')}!`);
		});
	} else {
		app.listen(app.get('port'), function () {
			console.log(`Express app listening on port ${app.get('port')}!`);
		});
	}
});

exports = module.exports = app;
