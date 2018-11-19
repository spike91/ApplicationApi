var log = require('../libs/log')(module);
var CityModel = require('../models/city').CityModel;
var CountryModel = require('../models/country').CountryModel;

exports.city_list = function(req, res) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    return CityModel.paginate({},{ page, limit, populate: 'country' }).then(function (result) {
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

exports.city_by_country_name_list = function(req, res) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var countriesId = [];
    CountryModel.find({ name : req.params.name}, function(err, result){
        if(result) {
            result.forEach(element => {
                countriesId.push(element._id);
            });
        }
    }).then(function(){
        return CityModel.paginate({ country : { $in : countriesId }}, { page, limit, populate: 'country' }).then(function (result) {
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
    });  

};

exports.create = function(req, res) {
    var city = new CityModel({
        name: req.body.name,
        countrycode: req.body.code,
        district: req.body.district,
        population: req.body.population,
        country: req.body.country
    });

    var seq = 1;
    CityModel.find(function(err, result){

        if(!err && result.length > 0){
            seq = result[0].id + 1;
        }

        city.id = seq ? seq : 1;

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
                log.error(`Internal error(${res.statusCode}): ${err.message}`);
            }
        });
    }).sort( { id: -1 } ).limit(1);
    
};

exports.getById = function(req, res) {
    return CityModel.findById(req.params.id, function (err, city) {
        if(!city) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', city:city });
        } else {
            res.statusCode = 500;
            log.error(`Internal error(${res.statusCode}): ${err.message}`);
            return res.send({ error: 'Server error' });
        }
    });
};

exports.update = function(req, res) {
    return CityModel.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, city){
        if (!err) {
            return res.send({ status: 'OK', message: 'City updated.' });
        }else {
            res.statusCode = 500;
            log.error(`Internal error(${res.statusCode}): ${err.message}`);
            return res.send({ error: 'Server error' });
        }
    });
};

exports.delete = function(req, res) {
    return CityModel.findByIdAndDelete(req.params.id, {$set: req.body}, function(err, city){
        if (!err) {
            return res.send({ status: 'OK', city: city});
        }else {
            res.statusCode = 500;
            log.error(`Internal error(${res.statusCode}): ${err.message}`);
            return res.send({ error: 'Server error' });
        }
    });
};
