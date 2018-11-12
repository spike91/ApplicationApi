var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Schemas
var City = new Schema({
    id: { type: Number, unique: true },
    name: { type: String, maxlength: 100},
    countrycode: { type: String, maxlength: 3, minlength: 3},
    district: { type: String, maxlength: 100},
    population: { type: Number, default: 0 }
});

var CityModel = mongoose.model('City', City);

module.exports.CityModel = CityModel;