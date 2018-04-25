var mongoose = require('mongoose'), Schema = mongoose.Schema;

// type : c'est le type du schema correspondant au ref. Donc ici c'est l'ObjectID 
// Create schema
var postulationSchema  = new mongoose.Schema({
    "_acteur" : { type: Schema.Types.ObjectId, ref: 'acteur' },
    "_offre" : { type: Schema.Types.ObjectId, ref: 'offreRole' },
    "etat" : String,
    "dateAjout" : String
});

module.exports = mongoose.model('postulation', postulationSchema,'postulation');