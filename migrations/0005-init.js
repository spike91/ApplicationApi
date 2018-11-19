var mongodb = require('mongodb');
var fs = require('fs');
var log = require('../libs/log')(module);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var citiesJson = JSON.parse(fs.readFileSync('data/cities.json', 'utf8'));
var countriesJson = JSON.parse(fs.readFileSync('data/countries.json', 'utf8'));

exports.up = function (db, next) {    
    countriesJson.forEach(element => {
        element._id = new mongoose.Types.ObjectId;
        var cities =  citiesJson.filter(item => item.countrycode === element.code);  
        cities.forEach(item => {
            item.country = element._id;
        });     
    });
    citiesJson.forEach(item => {
        item._id = new mongoose.Types.ObjectId;
        var country = countriesJson.find(function(element) {
            return element.capital === item.id;
          });
        if(country) country.capitalCity = item._id;
    });   

     var cities = db.collection('cities');
     cities.insertMany(citiesJson);
     var countries = db.collection('countries');
     countries.insertMany(countriesJson, next);

};

exports.down = function (db, next) {
    var cities = db.collection('cities');
     cities.deleteMany();
     var countries = db.collection('countries');
     countries.deleteMany({}, next);
};