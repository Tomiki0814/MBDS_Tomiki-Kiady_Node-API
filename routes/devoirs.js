let devoir = require('../model/devoir');
require('../model/etudiant')

// Récupérer tous les assignments (GET)
function getAssignmentsSansPagination(req, res){
    devoir.find().populate(["idEtudiant","idMatiere"]).exec((error, commandes) => {
      if (error) return next(error);
      res.json(commandes);
  })
}

function getAssignments(req, res) {
    var page =  parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 10;
    var skip = (page - 1) * limit;
    devoir.find()
    .populate(["idEtudiant","idMatiere"])
    .skip(skip)
    .limit(limit)
    .exec((error, commandes) => {
        if (error) return next(error);
        res.json(commandes);
    })
   }
   

module.exports = {getAssignments, getAssignmentsSansPagination };
