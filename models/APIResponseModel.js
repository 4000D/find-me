var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var APIResponseSchema = new Schema({	'input_string' : String,	'base' : {		lat: {type: Number, require: true},		lng: {type: Number, require: true}	},	'response' : String // should be object.. but i don't know API response});

module.exports = mongoose.model('APIResponse', APIResponseSchema);
