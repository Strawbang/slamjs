var express = require('express');
var router = express.Router();
var role = require('../models/role');


router.get('/', function(req, res, next) {    
    role.find({},{},function(e,docs){
        res.render('role', {
            "title" : "Liste des rôles",
            "rolelist" : docs
        });
    });
});


/* Ajout d'un rôle */
router.post('/add', function(req, res) {
    //Récupère valeurs du formulaire
    var roleName = req.body.name;

    var newRole = new role({
        "nom" : roleName
    });

    newRole.save( function (err, doc) {
        if (err) {
            // Retour d'une erreur
            res.send("Pas de role !");
        }
        else {
            res.redirect("/role");
        }
    });
});

/* Supprimer un rôle */
router.get('/delete/:id', function(req, res) {
    var id = req.params.id;
        role.findByIdAndRemove(id, function(e, docs){
    res.redirect('/role');
  });
});


module.exports = router;