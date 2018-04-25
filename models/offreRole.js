var mongoose = require('mongoose');

// Create schema
var offreRoleSchema  = new mongoose.Schema({
    "_evenement" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'evenement' }],
    "_role" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'role' }],
    "nbRoles" : Number
});

module.exports = mongoose.model('offreRole',offreRoleSchema,'offreRole');