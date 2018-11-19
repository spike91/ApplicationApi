var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

// Schemas
var Country = new Schema({
    code: {
        type: String,
        minlength: 3,
        maxlength: 3,
        unique: true,
        required: true
    },
    name: { type: String, maxlength: 50, required: true },
    region: { type: String, maxlength: 30, required: true },
    continent: { 
        type: String, 
        maxlength: 15,
        enum: ['Asia', 'Europe', 'North America', 'Africa', 'Oceania', 'Antarctica', 'South America'],
        default: 'Asia',
        required: true },
    capital: { type: Number},
    capitalCity: { type: String, ref: 'cities'},
    surfacearea: { type: Number},
    indepyear: { type: Number },
    population: { type: Number },
    lifeexpectancy: { type: Number },
    gnp: { type: Number },
    gnpold: { type: Number },
    localname: { type: String },
    governmentform: { type: String },
    headofstate: { type: String },
    code2: { type: String, minlength: 2, maxlength: 2}
});

Country.plugin(mongoosePaginate);
var CountryModel = mongoose.model('countries', Country);

module.exports.CountryModel = CountryModel;