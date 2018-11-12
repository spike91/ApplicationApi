var jwt = require('jsonwebtoken');
var config = require('../libs/config');
var log = require('../libs/log')(module);

var authentification = function (req, res, next) {
    var token = req.headers['x-access-token'];
    var msg = {auth: false, message: 'No token provided.'};
    if (!token) res.status(500).send(msg);
    else jwt.verify(token, config.get('secret'), function (err, decoded) {
        var msg = {auth: false, message: 'Failed to authenticate token.'};
        if (err) res.status(500).send(msg);
        else {
            req.decoded = decoded;
            next();
        }        
    });
}

module.exports = authentification;