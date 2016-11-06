var mongoose = require('mongoose');
var dberror = require('./dberror');

var ParserSchema = new mongoose.Schema({
	city      : { type: String, unique: true, required: true },
	login     : { type: String, required: true },
	password  : { type: String, required: true },
	timeout   : { type: Number, default: 10800000 },
	lastrun		: { type: Date, default: Date.now }
});
ParserSchema.post('save', dberror);
ParserSchema.post('update', dberror);
ParserSchema.post('findOneAndUpdate', dberror);
ParserSchema.post('insertMany', dberror);

module.exports = mongoose.model('Parser', ParserSchema);
