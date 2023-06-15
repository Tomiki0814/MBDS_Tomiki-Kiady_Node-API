let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let EtudiantSchema = Schema({
    id: Number,
    nom: String,
    prenom: String,
    email: String,
    sexe: String
});

EtudiantSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Etudiants', EtudiantSchema, 'etudiants');
