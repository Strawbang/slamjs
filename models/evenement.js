var mongoose = require('mongoose');

var evenementSchema = new mongoose.Schema({
    "nom" : String,
    "type" : String,
    "dateDebut" : String,
    "dateFin" : String,
    "nombreJours" : String,
    "roleDemande" : String,
    "nombreFigurantDemandeParRole" : String,
    "listeDesFigurantsRetenu" : String
});

module.exports = mongoose.model('evenement',evenementSchema,'evenement');