# MBDSMagascar2022_2023_api

## Lancement du projet

Pour lancer le projet en locale:
- Cloner le repository puis installer les dependances avec `npm install`
- Lancer `npm start`

## A propos du projet

- Ce projet est déja deployer sur [render.com](https://mbds-assignement-back-end-api.onrender.com)
- Lors de ce projet Chat gpt a été d'une grande aide lors de la recuperation des entité associe à devoir et autres.
- La partie back-end est essentiellement composé des API qui seront appelé par le front-end Angular
- On peut trouver la collection des APIs disponibles sur ce projet dans les fichier :
  - `Assignement Api Local.postman_collection.json` pour la collection locale
  - `Assignement Api Prod.postman_collection.json` pour la collection deployé

### Liste des models avec leurs api

#### User
- User: {nom, password, profil}
- Methode Login

#### Etudiant
- Etudiant: {nom, prenom, sexe, email}
- fonction select avec et sans pagination
   
#### Matiere
- Matiere: {id, nom, images, prof ,profImage}
- fonction select avec et sans pagination
    

#### Devoir
- Devoir: {idMatiere, idEtudiant, estRendu, note, remarque}
- Operation CRUD
- Recherche par rapport à une matiere
- Recherche par rapport à un étudiant
- Annuler devoir

## Notre équipe
- S.RAMANANTSOA Andrianina Tomiki n°59
- RAKOTOHARINJATOVO kiady n°25    
    

