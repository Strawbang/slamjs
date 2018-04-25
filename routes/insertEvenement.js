var express = require('express');
var router = express.Router();
var evenement = require('../models/evenement');

/* Liste des évenements */
router.get('/', function(req, res, next) {
  res.render('insertEvenement', { "title" : "Ajout d'un evenement" });
});

/* Ajout d'un évenements */
router.post('/add', function(req, res) {
    // Récupération des valeurs du formulaire
    var evenementNom = req.body.nom;
    var evenementType = req.body.type;
    var evenementDate = req.body.date;
    var evenementNbJours = req.body.nombreJours;

    // Création de l'objet evenement suivant le schéma
    var newEvenement = new evenement({
        "nom" : evenementNom,
        "type" : evenementType,
        "date" : evenementDate,
        "nombreJours" : evenementNbJours
    });

    newEvenement.save( function (err, doc) {
        if (err) {
            // Retour d'une erreur
            res.send("Pas d'evenement !");
        }
        else {
            // Redirection vers la liste
            res.redirect("/evenements");
        }
    });
});

module.exports = router;
