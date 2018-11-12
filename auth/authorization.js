var UserService = require('../services/userService');
var log = require('../libs/log')(module);

var authorization = function (req, res, next) {
    var email = req.decoded.email;
    var msg = {auth: false, message: 'Permissions denied.'};
    UserService.getUserByEmail(email).then(function(result){
            if(result == null) {
                res.status(500).send(msg);
            } else 
            if (!result.isAdmin) res.status(500).send(msg);
            else next();
        },
        function (error) {
            res.status(500).send(msg);
        }); 
    
}

module.exports = authorization;