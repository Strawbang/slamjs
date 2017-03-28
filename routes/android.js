var express = require('express');
var router = express.Router();
var user = require('../models/figurant');

/* Liste des utilisateurs par JSon */
router.get('/', function(req, res, next) {
  var response = {};
 
  figurant.find({},function(err,data){
   if (err) {
    response = {"error" : true,"message" : "Error fetching data"};
   } else {
     response = {data};
    }

   res.json(response);
  });
});

module.exports = router;
