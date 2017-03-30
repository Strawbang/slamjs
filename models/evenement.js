var mongoose = require('mongoose');

var evenementSchema = new mongoose.Schema({
    "nom" : String,
    "type" : String,
    "nombreJours" : String
});

module.exports = mongoose.model('evenement',evenementSchema,'evenement');