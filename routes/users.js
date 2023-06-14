let user = require('../model/user');

// Récupérer tous les assignments (GET)
function getUsersSansPagination(req, res){
    user.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

function getUsers(req, res) {
    var aggregateQuery = user.aggregate();
    
    user.aggregatePaginate(aggregateQuery,
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
   
module.exports = { getUsers, getUsersSansPagination };
