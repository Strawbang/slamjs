var express = require('express');
var router = express.Router();
var evenement = require('../models/evenement');

/* Liste des figurants */
router.get('/', function(req, res, next) {
 evenement.find({},{},function(e,docs){
  res.render('evenements', {
   "title" : "Liste des evenements",
   "evenementlist" : docs
  });
 });
});

/* Supprimer un figurant */
router.get('/delete/:id', function(req, res) {
    var id = req.params.id;
        evenement.findByIdAndRemove(id, function(e, docs){
    //console.log(figurant)
    res.redirect('/evenements');
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
