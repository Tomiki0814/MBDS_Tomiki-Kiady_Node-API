let user = require('../model/user');

function Login(req, res) {
    let name = req.body.username;
    let pwd = req.body.mdp
    user.findOne({nom: name, password: pwd}, (err, result) => {
        if (err) {
            res.send(err)
        }
        if(result == null){
             res.send(result)
            return
        }
        let userResult = new user(result)
        userResult.password = null;
        res.json(userResult);
    })
}

module.exports = {Login};
