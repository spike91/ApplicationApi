var log = require('../libs/log')(module);
var CountryModel = require('../models/country').CountryModel;

exports.country_list = function(req, res) {    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    return CountryModel.paginate({}, { page, limit, populate: 'capitalCity' }).then(function (result) {
        if(!result) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return res.send({ status: 'OK', result:result });
    },
    function(error){
        res.statusCode = 500;
        log.error(`Internal error(${res.statusCode}): ${error.message}`);
        return res.send({ error: 'Server error' });
    });
};

exports.country_by_continent_name_list = function(req, res) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    return CountryModel.paginate({ continent: req.params.name }, { page, limit}, function (err, result) {
        if(!result) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', result:result });
        } else {
            res.statusCode = 500;
            log.error(`Internal error(${res.statusCode}): ${err.message}`);
            return res.send({ error: 'Server error' });
        }
    });
};

exports.country_create = function(req, res) {
    var country = new CountryModel({
        name: req.body.name,
        code: req.body.code,
        region: req.body.region,
        continent: req.body.continent,
        capital: req.body.capital,
        capitalCity: req.body.capitalCity,
        surfacearea: req.body.surfacearea,
        indepyear: req.body.indepyear,
        population: req.body.population,
        lifeexpectancy: req.body.lifeexpectancy,
        gnp: req.body.gnp,
        gnpold: req.body.gnpold,
        localname: req.body.localname,
        governmentform: req.body.governmentform,
        headofstate: req.body.headofstate,
        code2: req.body.code2
    });

    country.save(function (err) {
        if (!err) {
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
            log.error(`Internal error(${res.statusCode}): ${err.message}`);
        }
    });
};