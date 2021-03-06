var express = require('express');
var router = express.Router();
var event = require('../models/evenement');
var offre = require('../models/offreRole');
var roles = require('../models/role');
var postulation = require('../models/postulation');
var figurant = require('../models/acteur');

/* Liste des évènements JSon */
router.get('/events', function(req, res, next) {
    var response = {};

    event.find({},{},function(err,events){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {events};
        }
        //Retourne un tableau de tous les évènements au format json
        res.json(response);
    });
});


/* Liste des offres d'un évènement JSon */
router.get('/event/:id/offre', function(req, res, next) {
    var response = {};
    idEvent = req.params.id;

    //Recherche les offres avec l'id '_event'  
    offre.find({"_evenement" : idEvent},{},function(err,offres){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {offres};
        }
        //Retourne un tableau de toutes les offres en JSON
        res.json(response);
    }).populate('_role');
    //Le populate est un processus de remplacement automatique des chemins spécifiés
    //dans l'object par des objects provenant d'autres collections
});


/* Liste des offres JSon */
router.get('/offres', function(req, res, next) {
    var response = {};

    roles.find({},{},function(err,roles){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {roles};
        }

        res.json(response);
    });
});


/* Liste des rôles par évènement JSon */
router.get('/offres/:id/events', function(req, res, next) {
    var response = {};
    idRole = req.params.id;

    offre.find({"_role" : idRole},{},function(err,offres){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {offres};
        }

        res.json(response);
    }).populate('_evenement');
    //Le populate est un processus de remplacement automatique des chemins spécifiés
    //dans l'object par des objects provenant d'autres collections
});


/* Détails de l'offre en JSON */
router.get('/offre/:id', function(req, res, next) {
    var response = {};
    idOffre = req.params.id;

    //Recherche une offre correspondante à l'id envoyé
    offre.findOne({"_id" : idOffre},{},function(err,offres){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {offres};
        }
        //Retourne l'offre demandé au format JSON
        res.json(response);
    }).populate('_evenement').populate('_role');
    //Le populate est un processus de remplacement automatique des chemins spécifiés
    //dans l'object par des objects provenant d'autres collections
});


/* Le figurant postule avec son email à une offre */
router.post('/postule/:idOffre/:email', function(req, res, next) {
    //Récupère les données de l'url
    idOffre = req.params.idOffre;
    emailFigurant = req.params.email;

    //Recherche du figurant avec l'email dans la base de données
    figurant.findOne({"email" : emailFigurant},{},function(e,docs){
        var id = null;

        //Si l'email ne correspond à aucun figurant on creer un nouveau figurant
        if(!docs){
            var newFigurant = new figurant({
                "email" : emailFigurant
            });

            newFigurant.save( function (err, doc) {
                if (err) {
                    // Retour d'une erreur
                    res.send(err);
                }
            });
            //Récupère son id
            id = newFigurant._id;
        }
        //Sinon on recupere l'id
        else{
            id = docs._id;
        }

        //Recherche si la postulation du figurant n'existe pas
        postulation.findOne({"_acteur": id,"_offre": idOffre},{},function(e,docs){
            //Si la postulation du figurant n'existe pas
            if(!docs){
                //Date actuelle
                var date = new Date();
                var jour = date.getDate();
                var mois = date.getMonth();
                var annee = date.getYear();
                var dateAjout = jour+"/"+mois+"/"+annee;

                var newPostulation = new postulation({
                    "_acteur" : id,
                    "_offre" : idOffre,
                    "etat" : "En attente",
                    "dateAjout" : dateAjout
                }); 

                newPostulation.save( function (err, doc) {
                    if (err) {
                        // Retour d'une erreur
                        res.send("Postulation refusé");
                    }else {
                        res.send("Validé !");
                    }
                });
            }
            //Si la postulation existe déjà on ne fait rien
            else{
                res.send("Vous avez déjà postulé !");
            }
        });
    });
});


/* Liste des postulations par figurant (avec email) JSon */
router.get('/postu/:email', function(req, res, next) {
    var response = {};
    emailFigurant = req.params.email;

    //On cherche le figurant correspondant à l'email
    figurant.findOne({"email" : emailFigurant},{},function(e,docs){
        if(!docs){
            res.status(404).send("Aucun figurant trouvé");
        }
        else{
            //On recherche les postulation du figurant avec son id
            postulation.find({ "_acteur" : docs._id},{},function(err, postulations){
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                } else {
                    response = {postulations};
                }
                //Retourne les postulations du figurant
                res.json(response);
            }).populate('_acteur')
                .populate({path: '_offre',populate: {path: '_evenement', model: 'evenement'}})
                .populate({path: '_offre', populate: {path: '_role' , model: 'role'} });
            //Le populate est un processus de remplacement automatique des chemins spécifiés
            //dans l'object par des objects provenant d'autres collections
        }
    });
});

router.delete('/postulation/:id/delete', function(req, res, next) {
    id = req.params.id;

    //On cherche le figurant correspondant à l'email
    postulation.remove({ "_id": id }, function (err) {
        if (err) return handleError(err);
        res.send('Supprimé !')
    });
});



module.exports = router;
