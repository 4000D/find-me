var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var MLOutputSchema = new Schema({

module.exports = mongoose.model('MLOutput', MLOutputSchema);