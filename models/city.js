var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

// Schemas
var citySchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String, maxlength: 100},
    countrycode: { type: String, maxlength: 3, minlength: 3},
    district: { type: String, maxlength: 100},
    population: { type: Number, default: 0 },
    country: { type: String, ref: 'Country'}
});

citySchema.plugin(mongoosePaginate);
var CityModel = mongoose.model('City', citySchema);

module.exports.CityModel = CityModel;
