var log = require('../libs/log')(module);
var CityModel = require('../models/city').CityModel;

exports.city_list = function(req, res) {
    return CityModel.find(function (err, cities) {
        if(!countries) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', cities:cities });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
};

exports.city_by_country_name_list = function(req, res) {
    return CityModel.find({ countrycode: req.params.name }, function (err, cities) {
        if(!cities) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', cities:cities });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
};

exports.city_create = function(req, res) {
    var city = new CityModel({
        id: req.body.id,
        name: req.body.name,
        countrycode: req.body.code,
        district: req.body.district,
        population: req.body.population
    });

    city.save(function (err) {
        if (!err) {
            log.info("city created");
            return res.send({ status: 'OK', city:city });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
};