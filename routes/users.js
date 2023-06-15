let user = require('../model/user');

function Login(req, res){
  let name = req.body.username;
  let pwd = req.body.mdp
  user.findOne({nom: name, password:pwd}, (err, assignment) =>{
    if(err){res.send(err)}
    res.json(assignment);
  })
}
   
module.exports = {Login};
