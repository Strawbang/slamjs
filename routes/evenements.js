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

/* Changer l'état de la postulation */
router.put('/:id/update/:idDemande',function(req, res, next) {
    //Récupère l'id en paramètre
    id = req.params.id;
    idDemande = req.params.idDemande;
    //Récupère valeur du formulaire
    etat = req.body.etat;
    
    //Recherche la postulation avec l'id et la modifie son état
    postulation.findByIdAndUpdate({"_id": idDemande},{ $set:{ "etat": etat} }, function(e,docs){
        if(e){
            res.status(500).send(e);  
        }
        else{       
            // Redirection vers la liste
            res.send("success");
        }
    });
});

/* Ajout d'un rôle à un évènement */
router.post('/:id/role/add', function(req, res) {
    id = req.params.id;

    var roleId = req.body.roleId;
    var roleNbFigurant = req.body.nbFigurant;

    var newOffreRole = new offreRole({
        "event" : id,
        "role" : roleId,
        "nbRole" : roleNbFigurant
    });

    newOffreRole.save( function (err, doc) {
        if (err) {
            // Retour d'une erreur
            res.send("Pas d'event !");
        }
        else {
            // Redirection vers la liste
            res.redirect("/evenements/"+id);
        }
    });
});

/* GET l'évènement par son id */
router.get('/:id', function(req, res, next) {    
    id = req.params.id;
    // Res = résultat
    // ""Docs renvoi un résultat de la requête
    // res.render('view')
    evenement.findById({"_id": id},{},function(e,eventDocs){
        role.find({},{},function(e,roleDocs){
            offreRole.find({"event" : id},{},function(e,offreDocs){
                // On récupère la collection offreDocs(le resultat)
                // findOne recupère une valeur qui serra un objet
                var arrayIdOffre = [];
                
                for(var i = 0; offreDocs.length > i; i++){
                    arrayIdOffre.push(offreDocs[i]._id);
                }
                
                demandeFiguration.find({ "offre": { $in: arrayIdOffre } },{},function(e,demandeFigurationnDocs){
                    res.render('event', {
                        "title" : "Evénement",
                        "eventlist" : eventDocs,
                        "rolelist" : roleDocs,
                        "offrelist" : offreDocs,
                        "demandeFigurationlist" : demandeFigurationDocs

                    })    
                }).populate('event')
                    .populate('figurant')
                    .populate('offre').populate({path: 'offre', populate: {path: 'role' , model: 'role'} });
                //Le populate est un processus de remplacement automatique des chemins spécifiés
                //dans l'object par des objects provenant d'autres collections
                }).populate('role');
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
