var log = require('../libs/log')(module);
var CountryModel = require('../models/country').CountryModel;

exports.country_list = function(req, res) {
    return CountryModel.find(function (err, countries) {
        if(!countries) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', countries:countries });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
};

exports.country_by_continent_name_list = function(req, res) {
    return CountryModel.find({ continent: req.params.name }, function (err, countries) {
        if(!countries) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', countries:countries });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
};

exports.country_create = function(req, res) {
    var country = new CountryModel({
        name: req.body.name,
        code: req.body.code,
        region: req.body.region,
        continent: req.body.continent
    });

    country.save(function (err) {
        if (!err) {
            log.info("country created");
            return res.send({ status: 'OK', country: country });
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