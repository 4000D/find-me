var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var MLOutputSchema = new Schema({	'csv_file_name': {type: String, unique: true},	'image_file_name': [String],	'predicted_sign_names': [String],	'is_success': {type: Boolean, default: true},	'final_result': {		name: String,		dist: Number,		address: String,		location: {			lat: Number,			lng: Number		}	},	'candidates': [		{			name: String,			dist: Number,			address: String,			location: {				lat: Number,				lng: Number			}		}	]});

module.exports = mongoose.model('MLOutput', MLOutputSchema);
