var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var uri = process.env.DB_URI;

mongoose.connect( process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', function(err) {
    console.log("Mongoose connection error");
    console.log(err);
});

mongoose.connection.on('disconnected', function() {
    console.log("Mongoose disconnected");
});

mongoose.connection.on('open', function() {
    console.log("Mongoose connected");
});

exports.mongoose = mongoose;
exports.db = mongoose.connection;