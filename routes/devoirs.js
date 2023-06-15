let devoir = require('../model/devoir');
require('../model/etudiant')

// Récupérer tous les assignments (GET)
function getDevoirsSansPagination(req, res){
    devoir.find().populate(["idEtudiant","idMatiere"]).exec((error, commandes) => {
      if (error) return next(error);
      res.json(commandes);
  })
}

function getDevoirs(req, res) {
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

function addDevoir(req, res){
    let devoirDto = new devoir(req.body);
    devoirDto.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ devoirDto: `${devoirDto} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateDevoir(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    
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
   

module.exports = {addDevoir, getDevoirs, getDevoirsSansPagination, updateDevoir, deleteDevoir };
