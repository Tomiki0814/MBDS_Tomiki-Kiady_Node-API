const devoir = require('../model/devoir');
let etudiant = require('../model/etudiant');
let matiere = require('../model/matiere')
function getAssignmentsSansPagination(req, res){
  var listeEtudiant;
  var listeMatiere;
    etudiant.find((err, assignments) => {
        if(err){
            res.send(err)
        }
        listeEtudiant = assignments;
        //console.log(listeEtudiant)
        res.send(assignments);
    });
    /*matiere.find((err, assignments) => {
      if(err){
          res.send(err)
      }
      listeMatiere = assignments;
      var listeResult = [];
      var stringjson="";
      for(var i=0; i<listeEtudiant.length; i++){
          for(var a=0; a<listeMatiere.length; a++){
            var note = Math.floor( Math.random() * (17.5 - 6)) + 6
            stringjson+= '{"idEtudiant": "'+listeEtudiant[i]._id+'", '
            stringjson+= '"idMatiere": "'+listeMatiere[a]._id+'",'
            stringjson+= '"note": "'+note+'",'
            stringjson+= '"remarque": "'+'"},\n'
          }

      }
      res.send(stringjson)
  });*/
  

}

function getAssignments(req, res) {
    var aggregateQuery = etudiant.aggregate();
    
    etudiant.aggregatePaginate(aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, assignments) => {
        if (err) {
          res.send(err);
        }
        res.send(assignments);
      }
    );
   }
   
// Récupérer un assignment par son id (GET)
function getUser(req, res){
    let assignmentId = req.params.id;

    etudiant.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}





module.exports = { getAssignments, getAssignmentsSansPagination };
