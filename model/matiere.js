let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let MatiereSchema = Schema({
    id: Number,
    nom: String,
    images: String,
    prof: String,
    profImage:String,
});

MatiereSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('Matieres', MatiereSchema, 'matieres');
