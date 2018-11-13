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
        required: true }
});

Country.plugin(mongoosePaginate);
var CountryModel = mongoose.model('Country', Country);

module.exports.CountryModel = CountryModel;