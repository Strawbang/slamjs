var express = require('express');
var router = express.Router();
var event = require('../models/evenement');
var roles = require('../models/role');
var offreRoles = require('../models/offreRole');
var postulation = require('../models/postulation');

/* GET home page, liste des évènements existant */
router.get('/', function(req, res, next) {    
    event.find({},{},function(e,docs){
        res.render('evenements', {
            "title" : "Liste des événements",
            "evenementlist" : docs
        });
    });
});


/* GET l'évènement par son id */
router.get('/:id', function(req, res, next) {    
    id = req.params.id;
    // Res = résultat
    // ""Docs renvoi un résultat de la requête
    // res.render('view')
    event.findOne({"_id": id},{},function(e,eventDocs){
        roles.find({},{},function(e,roleDocs){
            offreRoles.find({"_evenement" : id},{},function(e,offreDocs){
                // On récupère la collection offreDocs(le resultat)
                // findOne recupère une valeur qui serra un objet
                var arrayIdOffre = [];
                
                for(var i = 0; offreDocs.length > i; i++){
                    arrayIdOffre.push(offreDocs[i]._id);
                }
                
                postulation.find({ "_offre": { $in: arrayIdOffre } },{},function(e,postulationDocs){
                    res.render('event', {
                        "title" : "Evénement",
                        "evenementlist" : eventDocs,
                        "rolelist" : roleDocs,
                        "offrelist" : offreDocs,
                        "postulationlist" : postulationDocs

                    })    
                }).populate('_evenement')
                    .populate('_acteur')
                    .populate('_offre').populate({path: '_offre', populate: {path: '_role' , model: 'role'} });
                //Le populate est un processus de remplacement automatique des chemins spécifiés
                //dans l'object par des objects provenant d'autres collections
                }).populate('_role');
            });
        });
});


/* Ajout d'un rôle à un évènement */
router.post('/:id/role/add', function(req, res) {
    //Récupère l'id en paramètre dans l'url
    id = req.params.id;

    //Récupère les valeurs du formulaire
    var roleId = req.body.roleId;
    var roleNbFigurant = req.body.nbFigurant;

    var newOffreRoles = new offreRoles({
        "_evenement" : id,
        "_role" : roleId,
        "nbRoles" : roleNbFigurant
    });

    newOffreRoles.save( function (err, doc) {
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


/* Delete évènement par son id */
router.delete('/delete/:id', function(req, res, next) {    
    id = req.params.id;

    //Récupère les id des offres liés à l'évènement pour supprimer les postulation liés avec ces offres
    offreRoles.find({"_evenement" : id},{},function(e,offreDocs){
        var arrayIdOffre = [];

        for(var i = 0; offreDocs.length > i; i++){
            arrayIdOffre.push(offreDocs[i]._id);
        }

        event.remove({ "_id": id }, function (err) {
            postulation.remove({ "_offre": { $in: arrayIdOffre } }, function (err) {
                offreRoles.remove({ "_evenement": id }, function (err) {
                    if (err) res.send('error');
                    res.send('success');
                });
            });
        });
    });
});

/* Delete offre lié à l'évènement */
router.delete('/delete/:id/offre/:idOffre', function(req, res, next) {    
    id = req.params.id;
    idOffre = req.params.idOffre;

    postulation.remove({ "_offre": idOffre }, function (err) {
        offreRoles.remove({ "_id" : idOffre, "_evenement" : id }, function (err) {
            if (err) return handleError(err);
            res.send("success");
        });
    });
});

module.exports = router;

/* Changer l'état de la postulation */
router.put('/:id/update/:idPostu',function(req, res, next) {
    //Récupère l'id en paramètre
    id = req.params.id;
    idPostu = req.params.idPostu;
    //Récupère valeur du formulaire
    etat = req.body.etat;
    
    //Recherche la postulation avec l'id et la modifie son état
    postulation.findOneAndUpdate({"_id": idPostu},{ $set:{ "etat": etat} }, function(e,docs){
        if(e){
            res.status(500).send(e);  
        }
        else{       
            // Redirection vers la liste
            res.send("success");
        }
    });
});
