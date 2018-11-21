var mongoose = require('mongoose');
var log = require('./log')(module);
var config = require('./config');

function open(){
    var uri = "";
        if(process.env.NODE_ENV === 'test') {
            uri = config.get("mongoose:uri-test");
        }else{
            uri = config.get("mongoose:uri");
        }
        mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, (err, res) => {
             if(err) log.error('connection error:', err.message);
        });

}

function close(){
    return mongoose.disconnect();
}

module.exports = { close, open };