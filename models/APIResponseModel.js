var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var APIResponseSchema = new Schema({

module.exports = mongoose.model('APIResponse', APIResponseSchema);