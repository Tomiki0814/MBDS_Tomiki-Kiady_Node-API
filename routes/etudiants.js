const devoir = require('../model/devoir');
let etudiant = require('../model/etudiant');
let matiere = require('../model/matiere')

function getEtudiantsSansPagination(req, res) {
    var listeEtudiant;
    var listeMatiere;
    etudiant.find((err, assignments) => {
        if (err) {
            res.send(err)
        }
        listeEtudiant = assignments;
        //console.log(listeEtudiant)
        res.send(assignments);
        /*matiere.find((err, assignments) => {
            if(err){
                res.send(err)
            }
            listeMatiere = assignments;
            var listeResult = [];
            var stringjson="";
            let listDate=['2023-06-17','2023-06-18','2023-06-19','2023-06-20','2023-06-21'];
            let listcommentairebon = ['Assez bien','Bon travail','Peut encore mieux faire','Bon resultat','Bien jouer'];
            let listcommentairemauvais = ['Peut mieux faire','Encore un effort','Travailler plus',"Faite plus d'effort",'Travail mal faite'];
            for(var i=0; i<listeEtudiant.length; i++){
                for(var a=0; a<listeMatiere.length; a++){
                    var note = Math.floor( Math.random() * (17.5 - 6)) + 6
                    var commentNumber = Math.floor(Math.random() * 5);
                    var dateNumber = Math.floor(Math.random() * 5);
                    if(note>13){
                        stringjson+= '{"idEtudiant" : {"$oid": "'+listeEtudiant[i]._id+'"}, '
                        stringjson+= '"idMatiere": {"$oid": "'+listeMatiere[a]._id+'"},'
                        stringjson+= '"dateRendu":'+'"'+listDate[dateNumber]+'" ,'
                        if(i%2==0){
                            stringjson+='"estRendu": true ,'
                            stringjson+= '"note": '+note+','
                            stringjson+= '"remarque": "'+listcommentairebon[commentNumber]+'"},\n'
                        }else{
                            stringjson+='"estRendu": false'
                            stringjson+='},\n'
                        }

                    }else{
                        stringjson+= '{"idEtudiant" : {"$oid": "'+listeEtudiant[i]._id+'"}, '
                        stringjson+= '"idMatiere": {"$oid": "'+listeMatiere[a]._id+'"},'
                        stringjson+= '"dateRendu":'+'"'+listDate[dateNumber]+'" ,'
                        if(i%2==0){
                            stringjson+='"estRendu": true ,'
                            stringjson+= '"note": '+note+','
                            stringjson+= '"remarque": "'+listcommentairemauvais[commentNumber]+'"},\n'
                        }else{
                            stringjson+='"estRendu": false'
                            stringjson+='},\n'
                        }
                    }

                }

            }
            res.send(stringjson)
        });*/
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
