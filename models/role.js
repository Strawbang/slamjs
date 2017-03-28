var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
    "type" : String,
    "nom" : String
});

module.exports = mongoose.model('role',roleSchema,'role');