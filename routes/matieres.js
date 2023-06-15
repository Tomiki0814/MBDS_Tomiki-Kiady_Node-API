let matiere = require('../model/matiere');

// Récupérer tous les assignments (GET)
function getMatieresSansPagination(req, res) {
    matiere.find((err, assignments) => {
        if (err) {
            res.send(err)
        }

        res.send(assignments);
    });
}

function getMatieres(req, res) {
    var aggregateQuery = matiere.aggregate();
    matiere.aggregatePaginate(aggregateQuery,
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

module.exports = {getMatieres, getMatieresSansPagination};
