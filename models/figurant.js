var mongoose = require('mongoose');

var figurantSchema = new mongoose.Schema({
    "identifiant" : String,
    "nom" : String,
    "prenom" : String,
    "email" : {type : String, index: {unique: true}}
});

module.exports = mongoose.model('figurant',figurantSchema,'figurant');