var express  = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var worldRouter = require('./routes/v1/world');
var path = require('path'); 
var log = require('./libs/log')(module);
var config = require('./libs/config');

var app = express();

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use('/api/v1', worldRouter);

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: ' + req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});


app.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});