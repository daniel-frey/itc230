"use strict";

let records = require("../models/Record.js");

// return all records
records.find({}, (err, items) => {
    if (err) return next(err);
    console.log(items.length);
    // other code here
  });