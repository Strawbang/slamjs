var mongoose = require('mongoose');

var demandeFigurationSchema = new mongoose.Schema({
    "_acteur" : [{type : mongoose.Schema.Types.ObjectId, ref: 'acteur'}],
    "_offreRole" : [{type: mongoose.Schema.Types.ObjectId, ref: 'offreRole'}],
    "etat" : String,
    "dateAjout" : {type : Date, default : Date.now}

});

module.exports = mongoose.model('demandeActeur',demandeFigurationSchema,'demandeActeur');