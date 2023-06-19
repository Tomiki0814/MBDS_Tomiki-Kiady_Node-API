let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let DevoirSchema = Schema({
    idEtudiant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Etudiants"
    },
    idMatiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Matieres"
    },
    dateRendu: Date,
    estRendu: Boolean,
    note: Number,
    remarque: String
});

DevoirSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('devoirs', DevoirSchema);
