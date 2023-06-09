let devoir = require('../model/devoir');

// Récupérer tous les assignments (GET)
function getDevoirsSansPagination(req, res) {
    devoir.find().populate(["idEtudiant", "idMatiere"]).exec((error, devoirs) => {
        if (error) res.send(error);
        res.json(devoirs);
    })
}

function getDevoirs(req, res) {

    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 10;
    var skip = (page - 1) * limit;
    devoir.find()
        .populate(["idMatiere","idEtudiant" ])
        .sort(({_id: -1}))
        .skip(skip)
        .limit(limit)
        .exec((error, devoirs) => {
            if (error) res.send(error);
            devoir.countDocuments((err, count) => {
                if (err) {
                }
                var result = {docs: devoirs, totals: count}
                res.json(result);
            });

        })
}

function addDevoir(req, res) {
    let devoirDto = new devoir(req.body);
    devoirDto.save((err) => {
        if (err) {
            res.send('cant post assignment ', err);
        }
        res.json({devoirDto: `${devoirDto} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateDevoir(req, res) {

    devoir.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({message: assignment + 'updated'})
        }
    });

}

// suppression d'un assignment (DELETE)
function deleteDevoir(req, res) {

    devoir.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment} deleted`});
    })
}

function findDevoirByEditudiant(req, res) {
    devoir.find({idEtudiant: req.params.id})
        .populate(["idEtudiant", "idMatiere"])
        .exec((error, devoirs) => {
            if (error) res.send(error);
            res.json(devoirs);
        })

}

function findDevoirByMatiere(req, res) {
    devoir.find({idMatiere: req.params.id})
        .populate(["idEtudiant", "idMatiere"])
        .exec((error, devoirs) => {
            if (error) res.send(error);
            res.json(devoirs);
        })
}

function findDevoirById(req, res) {
    devoir.find({_id: req.params.id})
        .populate(["idEtudiant", "idMatiere"])
        .exec((error, devoirs) => {
            if (error) res.send(error);
            res.json(devoirs);
        })
}

function findDevoirByStatus(req, res) {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 10;
    var skip = (page - 1) * limit;
    devoir.find({estRendu: req.params.estRendu})
        .populate(["idEtudiant", "idMatiere"])
        .sort(({_id: -1}))
        .skip(skip)
        .limit(limit)
        .exec((error, devoirs) => {
            if (error) res.send(error);
            devoir.countDocuments({estRendu: req.params.estRendu},(err, count) => {
                if (err) {
                }
                var result = {docs: devoirs, totals: count}
                res.json(result);
            });

        })

}


function filtrerDevoirParNote(req, res){
    devoir.find({idMatiere:req.params.matiere, note: {$gte: req.params.minNote, $lte: req.params.maxNote} })
        .populate(["idEtudiant", "idMatiere"])
        .sort(({_id: -1}))
        .exec((error, devoirs) => {
            if (error) res.send(error);
            res.json(devoirs);
        }
)
}
function annulerDevoir(req, res){
    devoir.findByIdAndUpdate(req.body._id, {estRendu:false, $unset: { note: 1, remarque:1 } }, {new: true}, (err, assignment) => {
        if (err) {
            res.send(err)
        } else {
            res.json({message: assignment + 'updated'})
        }
    });
}

module.exports = {
    addDevoir,
    getDevoirs,
    getDevoirsSansPagination,
    updateDevoir,
    deleteDevoir,
    findDevoirByEditudiant,
    findDevoirByMatiere,
    findDevoirById,
    findDevoirByStatus,
    filtrerDevoirParNote,
    annulerDevoir
};
