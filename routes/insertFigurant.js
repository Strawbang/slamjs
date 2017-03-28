var express = require('express');
var router = express.Router();
var figurant = require('../models/figurant');

/* Liste des utilisateurs */
router.get('/', function(req, res, next) {
  res.render('insertFigurant', { "title" : "Ajout d'un figurant" });
});

/* Ajout d'un utilisateur */
router.post('/addfigurant', function(req, res) {
    // Récupération des valeurs du formulaire
    var figurantIdentifiant = req.body.identifiant;
    var figurantNom = req.body.nom;
    var figurantPrenom = req.body.prenom;
    var figurantEmail = req.body.email;

    // Création de l'objet utilisateur suivant le schéma
    var newFigurant = new figurant({
        "identifiant" : figurantIdentifiant,
        "nom" : figurantNom,
        "prenom" : figurantPrenom,
        "email" : figurantEmail
    });

    newFigurant.save( function (err, doc) {
        if (err) {
            // Retour d'une erreur
            res.send("Pas glop !");
        }
        else {
            // Redirection vers la liste
            res.redirect("/figurants");
        }
    });
});

module.exports = router;
