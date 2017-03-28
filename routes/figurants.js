var express = require('express');
var router = express.Router();
var figurant = require('../models/figurant');

/* Liste des figurantss */
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
