'use strict';
var express = require('express');
var router = express.Router();
var Parser = require('./models/parser');
var Response = require('./response');

var handleResult = function(response, error, data) {
	let result;
	if(!!error) {
		if(!!error.status) response.status(error.status)
		result = new Response((!!error.status) ? error.status : 500, null, (!!error.message) ? error.message : error)
	} else {
		result = new Response(0, data, "");
	}
	response.json(result);
};

/*
 * login to admin app
 */
router.post('/login', function(req, res) {
	handleResult(res, {status:501, message:"Method not implemented."}, null);
	// TODO: implement!
});

/*
 * /parsers route
 *  GET: finds all parsers
 *  POST: creates a new parser
 */
router.get('/parsers', function(req, res) {
	Parser.find(function(err, parsers) {
		handleResult(res, err, parsers)
	});
});
router.post('/parsers', function(req, res) {
	var parserData = req.body;
	var parser = new Parser(parserData);
	parser.save(function(err, parser) {
		handleResult(res, err, parser);
	});
});

/*
 * /parsers/:id route
 *  GET: find parser by id
 *  PUT: update parser by id
 *  DELETE: delete parser by id
 */
router.param('parserId', function(req, res, next, id) {
	return Parser.findById(id, function (err, parser) {
		if (err) {
      handleResult(res, err, parser);
    } else if (!parser) {
			handleResult(res, {status:404, message:`Parser ${id} not found.`}, null);
    } else {
			req.parser = parser;
      next();
    }
	});
});
router.get('/parsers/:parserId', function(req, res) {
	handleResult(res, null, req.parser);
});
router.put('/parsers/:parserId', function(req, res) {
	var parserData = req.body;
	let parser = req.parser;
  parser.city = parserData.city;
  parser.login = parserData.login;
  parser.password = parserData.password;
  if(!!parserData.timeout) parser.timeout = parserData.timeout;
	if(!!parserData.lastrun) parser.lastrun = parserData.lastrun;
  return parser.save(function (err, parser) {
		handleResult(res, err, parser);
  });
});
router.delete('/parsers/:parserId', function(req, res) {
	let parser = req.parser;
	parser.remove(function(err) {
		handleResult(res, err, {});
	});
});

exports.init = function(app, db) {
	app.set('trust proxy', true);
	app.use('/api', router);
	// error handlers
	app.use('/api', function(req, res, next){
		handleResult(res, {status:404, message:"Page not found."}, null);
    return;
	});
	app.use('/api', function(err, req, res, next){
		handleResult(res, {status: err.status || 500, message: err.message}, null);
    return;
	});
}
