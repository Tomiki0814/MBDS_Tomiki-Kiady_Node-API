const devoir = require('../model/devoir');
let etudiant = require('../model/etudiant');
let matiere = require('../model/matiere')

function getEtudiantsSansPagination(req, res) {
    var listeEtudiant;
    etudiant.find((err, assignments) => {
        if (err) {
            res.send(err)
        }
        listeEtudiant = assignments;
        res.send(assignments);

    });



}

function getEtudiants(req, res) {
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


module.exports = {getEtudiants, getEtudiantsSansPagination};
