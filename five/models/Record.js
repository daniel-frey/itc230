var credentials = require("../lib/credentials");
var mongoose = require("mongoose");

//remote db settings
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(credentials.mongo.development.connectionString, options);

//local db connection settings 
// var ip = process.env.ip || '127.0.0.1';
// mongoose.connect('mongodb://' +ip+ '/<Records>');

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Record model in JSON key/value pairs
// values indicate the data type of each key
var recordSchema = mongoose.Schema({
 name: String,
 year: Number,
 label: String,
});

module.exports = mongoose.model('Records', recordSchema);