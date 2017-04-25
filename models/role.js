var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
    "nom" : String
});

module.exports = mongoose.model('role',roleSchema,'role');