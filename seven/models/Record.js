var credentials = require("../lib/credentials");
var mongoose = require('mongoose');

var options = { server: 
  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } 
   } 
};
mongoose.connect(credentials.mongo.development.connectionString, options);

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

var mySchema = mongoose.Schema({
 name: String,
 year: Number,
 label: String,
}); 

module.exports = mongoose.model('Record', mySchema);