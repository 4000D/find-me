var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var BaseSchema = new Schema({	'base_name' : String,	'lat' : Number,	'lng' : Number});

module.exports = mongoose.model('Base', BaseSchema);
