var Record = require("../models/Record.js");
// return all records that match a condition
Record.findOne({name}, function (err, items) {
 //console.log(items.length);
 // other code here
});

// return all records
Record.find({}, function (err, items) {
    //console.log(items);
});

Record.find({}, function (err, items) {
  if (err) {console.log(err)
  }else {
   // console.log(items.length);
  }
});