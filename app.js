'use strict';
var express = require('express');

var app = require('./srv/app');
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/', express.static(__dirname + '/app'));
/*
// request logging function
app.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});
*/
