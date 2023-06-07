let etudiant = require('../model/etudiant');

// Récupérer tous les assignments (GET)
function getAssignmentsSansPagination(req, res){
    etudiant.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
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
