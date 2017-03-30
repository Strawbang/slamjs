var express = require('express');
var router = express.Router();
var evenement = require('../models/evenement');

/* Liste des utilisateurs par JSon */
router.get('/evenements', function(req, res, next) {
  var response = {};
 
  evenement.find({},function(err,data){
   if (err) {
    response = {"error" : true,"message" : "Error fetching data"};
   } else {
     response = {data};
    }

   res.json(response);
  });
});

module.exports = router;
