var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/thirsty-mongoose');
var db = mongoose.connection;

db.once('once', function() {
    console.log(`Conected to MongoDB at: ${db.host}:${db.port}`)
});
db.on('error', function(err) {
    console.log(`MongoDB Error: ${err}`)
});