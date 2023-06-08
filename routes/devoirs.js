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
  /*const lister = (next) => {
    Commande.find().populate(["plats.objetPlat","restaurant","client"]).exec((error, commandes) => {
        if (error) return next(error);
        commandes.forEach(cmd => cmd.client.password = "🍕");

        next(null, commandes);
    })
};*/
   }
   
// Récupérer un assignment par son id (GET)
function getUser(req, res){
    let assignmentId = req.params.id;

    devoir.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}





module.exports = { getAssignments, getAssignmentsSansPagination };
