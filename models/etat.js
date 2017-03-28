var mongoose = require('mongoose');

var etatSchema = new mongoose.Schema({
    "nom" : String,
    "type" : String,
    "dateDebut" : String,
    "dateFin" : String,
    "nombreJours" : String,
    "roleDemande" : String,
    "nombreFigurantDemandeParRole" : String,
    "listeDesFigurantsRetenu" : String
});

module.exports = mongoose.model('etat',evenementSchema,'etat');