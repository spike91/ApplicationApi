var connection = require('../libs/mongoose').connection;
var CityModel = require ('../models/city').CityModel;
var CountryModel = require ('../models/country').CountryModel;
var log = require('../libs/log')(module);

// TODO: read from file
var cities = [];
var countries = [];

countries.forEach(element => {
   countryCreate(element); 
});

cities.forEach(element => {
    cityCreate(element); 
 });

function countryCreate({ code, name, continent, region, surfacearea, indepyear, population, lifeexpectancy, gnp, gnpold, localname, governmentform, headofstate, capital, code2 }){
    var country = new CountryModel({
        name: name,
        code: code,
        region: region,
        continent: continent,
        surfacearea: surfacearea,
        population: population,
        capital: capital,
        indepyear: indepyear,
        lifeexpectancy: lifeexpectancy,
        gnp: gnp,
        gnpold: gnpold,
        localname: localname,
        governmentform: governmentform,
        headofstate: headofstate,
        code2: code2
    });
    country.save(function (err) {
        if (!err) {
            log.info("country created");
            return country;
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
            } else {
            }
        }
    });
    
}

function cityCreate( {id, name, countrycode, district, population} ){
    var city = new CityModel({
        id: id,
        name: name,
        countrycode: countrycode,
        district: district,
        population: population
    });

    city.save(function (err) {
        if (!err) {
            log.info("city created");
            return city;
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
            } else {
            }
        }
    });
    
}