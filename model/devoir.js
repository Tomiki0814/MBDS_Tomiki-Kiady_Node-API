
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let DevoirSchema = Schema({
    idEtudiant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Etudiants"
    },
    idMatiere:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Matieres"
    },
    dateRendu: Date,
    note: Number,
    remarque: String
});

DevoirSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche
module.exports = mongoose.model('devoirs', DevoirSchema);
