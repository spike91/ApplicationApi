var mongoose = require('mongoose');
var log = require('../libs/log')(module);
var config = require('../libs/config');

mongoose.connect(config.get('mongoose:uri'), { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});

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