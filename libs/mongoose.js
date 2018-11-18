var mongoose = require('mongoose');
var log = require('./log')(module);
var config = require('./config');

mongoose.connect(config.get('mongoose:uri'), { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});

module.exports.connection = db;