var mongoose = require('mongoose');

var evenementSchema = new mongoose.Schema({
    "nom" : String,
    "type" : String,
    "date": String,
    "nombreJours" : String
    //"_entretien" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'entretien' }]
});

module.exports = mongoose.model('evenement',evenementSchema,'evenement');