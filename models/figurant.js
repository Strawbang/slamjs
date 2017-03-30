var mongoose = require('mongoose');

var figurantSchema = new mongoose.Schema({
    "identifiant" : String,
    "nom" : String,
    "prenom" : String,
    //"evenement" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'evenement' }],
    "email" : {type : String, index: {unique: true}}
});

module.exports = mongoose.model('figurant',figurantSchema,'figurant');