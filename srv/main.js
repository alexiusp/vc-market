'use strict';
var express = require('express');
var router = express.Router();
var Parser = require('./models/parser');
var Response = require('./response');
var handleResult = function(error, data) {
	return (!!error)? new Response(error, null, "Error!") : new Response(0, data, "");
};
/*
 * login to admin app
 */
router.post('/login', function(req, res) {
	// TODO: implement!
});

/*
 * /parsers route
 *  GET: finds all parsers
 *  POST: creates a new parser
 */
router.get('/parsers', function(req, res) {
	Parser.find(function(err, parsers) {
		res.json(handleResult(err, parsers));
	});
});
router.post('/parsers', function(req, res) {
	var parserData = req.body;
	var parser = new Parser(parserData);
	parser.save(function(err, parser) {
		res.json(handleResult(err, parser));
	});
});

/*
 * /parsers/:id route
 *  GET: find parser by id
 *  PUT: update parser by id
 *  DELETE: delete parser by id
 */
router.get('/parsers/:id', function(req, res) {

});
router.put('/parsers/:id', function(req, res) {

});
router.delete('/parsers/:id', function(req, res) {

});

exports.init = function(app, db) {
	app.set('trust proxy', true);
	app.use('/api', router);
}
