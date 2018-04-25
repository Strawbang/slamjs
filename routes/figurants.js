var express = require('express');
var router = express.Router();
var figurant = require('../models/acteur');

/* Liste des figurants */
router.get('/', function(req, res, next) {
 figurant.find({},{},function(e,docs){
  res.render('figurants', {
   "title" : "Liste des figurants",
   "figurantlist" : docs
  });
 });
});

/* Supprimer un figurant */
router.get('/delete/:id', function(req, res) {
    var id = req.params.id;
        figurant.findByIdAndRemove(id, function(e, docs){
    //console.log(figurant)
    res.redirect('/figurants');
  });
});

router.get('/edit/:id', function(req,res) {
    figurant.findById(req.params.id, function(err, data) {
        /*if(err) {
            throw err;
        }
            data.status = !data.status;*/
        req.body.identifiant = data.identifiant;
        req.body.nom = data.nom;
        req.body.prenom = data.prenom;
        req.body.telephone = data.telephone;
        req.body.email = data.email;
        data.save(function(){
            res.redirect("/figurants");
        });
    });
});

/* Ajout d'un figurant */
router.post('/add', function(req, res, next) {
    // Récupération des valeurs du formulaire
    var figurantIdentifiant = req.body.identifiant;
    var figurantNom = req.body.nom;
    var figurantPrenom = req.body.prenom;
    var figurantTelephone = req.body.telephone;
    var figurantEmail = req.body.email;

    // Création de l'objet evenement suivant le schéma
    var newFigurant = new figurant({
        "identifiant" : figurantIdentifiant,
        "nom" : figurantNom,
        "prenom" : figurantPrenom,
        "telephone" : figurantTelephone,
        "email" : figurantEmail
    });

    newFigurant.save( function (err, doc) {
        if (err) {
            res.send("N'entrez pas le même numéro de téléphone et ou la même adresse email.");
        }
        else {
            res.redirect("/figurants");
        }
    });
});

module.exports = router;