var mongoose = require('mongoose');

var demandeFigurationSchema = new mongoose.Schema({
    "_figurant" : [{type : mongoose.Schema.Types.ObjectId, ref: 'figurant'}],
    "_offreRole" : [{type: mongoose.Schema.Types.ObjectId, ref: 'offreRole'}],
    "etat" : String,
    "dateAjout" : String
});

module.exports = mongoose.model('demandeFiguration',offreRoleSchema,'demandeFiguration');