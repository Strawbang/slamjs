var mongoose = require('mongoose');

// Create schema
var offreRoleSchema  = new mongoose.Schema({
    "evenement" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'evenement' }],
    "role" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'role' }],
    "nbRole" : Number
});

module.exports = mongoose.model('offreRole',offreRoleSchema,'offreRole');