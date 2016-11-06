'use strict';
const mongoose = require('mongoose');

exports.db = mongoose;
var dbURI = process.env.MONGODB_URI || 'mongodb://localhost/test';
exports.dbURI = dbURI;
mongoose.connect(dbURI);
exports.connection = mongoose.connection;

// CONNECTION EVENTS

// If the connection throws an error
mongoose.connection.on('error',function (err) {
	console.log('Mongoose default connection error: ' + err);
	process.exit(1);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose default connection disconnected');
	process.exit(1);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
	mongoose.connection.close(function () {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});
