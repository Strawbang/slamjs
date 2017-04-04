var mongoose = require('mongoose');

var demandeFigurationSchema = new mongoose.Schema({
    "figurant" : [{type : mongoose.Schema.Types.ObjectId, ref: 'figurant'}],
    "offreRole" : [{type: mongoose.Schema.Types.ObjectId, ref: 'offreRole'}],
    "etat" : String,
    "dateAjout" : String
});

module.exports = mongoose.model('demandeFiguration',demandeFigurationSchema,'demandeFiguration');