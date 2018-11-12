var express  = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var api = require('./routes/api');
var path = require('path'); 
var log = require('./libs/log')(module);
var config = require('./libs/config');
var CityModel = require('./libs/mongoose').CityModel;
var CountryModel = require('./libs/mongoose').CountryModel;

var app = express();

//app.use(logger('dev'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(router);
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/api', function(req, res) {
    return res.send({name: "Name"});
    });

app.get('/api/v1/world/country/all', function(req, res) {    
    return CountryModel.find(function (err, countries) {
        if (!err) {
            return res.send(countries);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.get('/api/v1/world/country/continent/:name', function(req, res) {
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
});

app.get('/api/v1/world/country/:name/city/all', function(req, res) {
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
});

app.get('/api/v1/world/country/:name/city/:name', function(req, res) {
    res.send('This is not implemented now');
});

app.post('/api/v1/world/country', function(req, res) {
    var country = new CountryModel({
        name: req.body.name,
        code: req.body.code,
        region: req.body.region,
        continent: req.body.continent
    });

    country.save(function (err) {
        if (!err) {
            log.info("country created");
            return res.send({ status: 'OK', country:country });
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
});

app.post('/api/v1/world/city', function(req, res) {
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
});

app.put('/api/v1/world/country/:name/city/:name', function (req, res){
    res.send('This is not implemented now');    
});

app.delete('/api/v1/world/country/:name/city/:name', function (req, res){
    res.send('This is not implemented now');
});


app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});


app.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});