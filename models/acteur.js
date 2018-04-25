var mongoose = require('mongoose');

var acteurSchema = new mongoose.Schema({
    //"identifiant" : String,
    "nom" : String,
    "prenom" : String,
    //"telephone" : {type : Number, index: {unique: true}},
    "email" : {type : String, index: {unique: true}}
});

module.exports = mongoose.model('acteur',acteurSchema,'acteur');