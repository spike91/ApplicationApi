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

var CountryModel = mongoose.model('Country', Country);

module.exports.CountryModel = CountryModel;