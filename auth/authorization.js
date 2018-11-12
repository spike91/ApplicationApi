var jwt = require('jsonwebtoken');
var config = require('../libs/config');

var authorization = function (req, res, next) {
    var token = req.headers['x-access-token'];
    var msg = {auth: false, message: 'No token provided.'};
    if (!token) res.status(500).send(msg);
    jwt.verify(token, config.get('secret'), function (err, decoded) {
        var msg = {auth: false, message: 'Failed to authenticate token.'};
        if (err) res.status(500).send(msg);
        next();
    });
}

module.exports = authorization;