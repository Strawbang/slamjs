var express = require('express');
var router = express.Router();
var evenement = require('../models/evenement');

/* Liste des utilisateurs */
router.get('/', function(req, res, next) {
  res.render('insertEvenement', { "title" : "Ajout d'un evenement" });
});

/* Ajout d'un utilisateur */
router.post('/addevenement', function(req, res) {
    // Récupération des valeurs du formulaire
    var evenementNom = req.body.nom;
    var evenementType = req.body.type;
    var evenementDebut = req.body.dateDebut;
    var evenementFin = req.body.dateFin;

    // Création de l'objet utilisateur suivant le schéma
    var newEvenement = new evenement({
        "nom" : evenementNom,
        "type" : evenementType,
        "debut" : evenementDebut,
        "fin" : evenementFin
    });

    newEvenement.save( function (err, doc) {
        if (err) {
            // Retour d'une erreur
            res.send("Pas glop !");
        }
        else {
            // Redirection vers la liste
            res.redirect("/evenements");
        }
    });
});

module.exports = router;
