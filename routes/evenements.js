var express = require('express');
var router = express.Router();
var evenement = require('../models/evenement');
var role = require('../models/role');
var offreRole = require('../models/offreRole');
var demandeFiguration = require('../models/demandeFiguration');

/* Liste des figurants */
router.get('/', function(req, res, next) {
 evenement.find({},{},function(e,docs){
  res.render('evenements', {
   "title" : "Liste des événements",
   "evenementlist" : docs
  });
 });
});

/* Supprimer un evenement */
router.get('/delete/:id', function(req, res, next) {
    var id = req.params.id;

    //Recuperation de l'id de l'evenement dans le model offreRole
    var idEvenement = {'evenement': id};
    //Recuperation de l'id de l'offre dans le model offreRole
    var idOffre = {'role': id}
    
      evenement.findByIdAndRemove(id, function(err){
        demandeFiguration.findByIdAndRemove(idOffre,function(err){
          offreRole.findByIdAndRemove(idEvenement,function(err){
          if (err) res.send('error');
          res.send('succes');
        //res.redirect('/evenements');
      });
    });
  });
});

/* Supprimer l'offre lié à l'évenement */
router.get('/delete/:id/offre/:idOffre', function(req, res, next) {    
    id = req.params.id;
    idOffre = req.params.idOffre;

    demandeFiguration.findByIdAndRemove({ 'offre': idOffre }, function (err) {
        offreRole.findByIdAndRemove({ 'id' : idOffre, 'evenement' : id }, function (err) {
            if (err) return handleError(err);
            res.send("success");
        });
    });
});

/* Modifier un figurant */
/*router.get('/edit/:id', function(req, res) {
    var id = req.params.id;
        figurant.findById(id,function(e,docs){

        var unfigurant = new figurant();

        var unfigurant.identifiant = req.body.identifiant;
        var unfigurant.nom = req.body.nom;
        var unfigurant.prenom = req.body.prenom;
        var unfigurant.email = req.body.email;

        // Save the updated document back to the database
        unfigurant.save(function (err, doc) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(unfigurant);
        });

 });
});*/

module.exports = router;
