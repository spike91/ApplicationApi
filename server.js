var express  = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var api = require('./routes/v1/api');
var path = require('path'); 
var log = require('./libs/log')(module);
var config = require('./libs/config');
var mongoose = require('mongoose');
var connection = require('./libs/mongoose-prod').connection;

var app = express();

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");  //* will allow from all cross domain
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/api/v1', api);

app.use(function(req, res, next){
    res.status(404);
    log.debug(`Not found URL: ${req.url}`);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error(`Internal error(${res.statusCode}): ${err.message}`);
    res.send({ error: err.message });
    return;
});

app.listen(config.get('port'), function(){
    log.info(`Express server listening on port ${config.get('port')}`);
});

module.exports = app;