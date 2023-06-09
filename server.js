let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let user = require('./routes/users')
let matiere = require('./routes/matieres')
let etudiant = require('./routes/etudiants')
let devoir = require('./routes/devoirs')
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
//const uri = 'mongodb+srv://mb:toto@cluster0.5e6cs7n.mongodb.net/assignments?retryWrites=true&w=majority';
const uri = 'mongodb+srv://tomikiramanantsoa:9KsoaJHqHf4HLB1B@myassignementbdd.9k96kwh.mongodb.net/mbds_assignements?retryWrites=true&w=majority'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(uri, options)
    .then(() => {
            console.log("Connecté à la base MongoDB assignments dans le cloud !");
            console.log("at URI = " + uri);
            console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
        },
        err => {
            console.log('Erreur de connexion: ', err);
        });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';
/**********************************/
app.route(prefix + '/assignments')
    .get(assignment.getAssignments)
    .post(assignment.postAssignment)
    .put(assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
    .get(assignment.getAssignment)
    .delete(assignment.deleteAssignment);

/**********************************/
app.route(prefix + '/login')
    .post(user.Login)
/**********************************/
app.route(prefix + '/matiere')
    .get(matiere.getMatieres)

app.route(prefix + '/all/matiere')
    .get(matiere.getMatieresSansPagination)

/**********************************/
app.route(prefix + '/etudiants')
    .get(etudiant.getEtudiants)

app.route(prefix + '/all/etudiants')
    .get(etudiant.getEtudiantsSansPagination)
/**********************************/
app.route(prefix + '/devoirs')
    .get(devoir.getDevoirs)
    .post(devoir.addDevoir);

app.route(prefix + '/devoirs/:id')
    .put(devoir.updateDevoir)
    .delete(devoir.deleteDevoir)
    .get(devoir.findDevoirById)

app.route(prefix + '/all/devoirs')
    .get(devoir.getDevoirsSansPagination)

app.route(prefix + '/findByEtudiant/:id')
    .get(devoir.findDevoirByEditudiant)

app.route(prefix + '/findbyMatiere/:id')
    .get(devoir.findDevoirByMatiere)

app.route(prefix + '/devoirs/sort/:estRendu')
    .get(devoir.findDevoirByStatus)
app.route((prefix+'/devoirs/note/sort/:matiere/:minNote/:maxNote'))
    .get(devoir.filtrerDevoirParNote)

app.route(prefix+'/devoirs/annuler/:id')
    .put(devoir.annulerDevoir)


// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


