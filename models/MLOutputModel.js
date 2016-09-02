var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var MLOutputSchema = new Schema({	'csv_file_name' : String,	'image_file_name' : [String],	'predicted_sign_names' : [String],	'used_by_google': {type: Boolean, default: false},});

module.exports = mongoose.model('MLOutput', MLOutputSchema);
