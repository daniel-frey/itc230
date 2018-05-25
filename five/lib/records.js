"use strict";

let records = require("../models/Record.js");

// return all records
exports.getAll = function() {
      return records
};

exports.getOne = function(name) {
  return records.find(function(item) {
      return item.name == name;
  });
};

exports.deleteOne = function(name) {
  const oldLength = records.length;
  movies = records.filter(function(item){
      return item.name !==name;
  });
  return {deleted: oldLength !==records.length, 
          total: records.length 
  };
};

exports.addOne = function(newRecord) {
  var added = false
  if (!this.getOne(newRecord.title)) {
      records.push(newRecord);
      added = true;
  }
  return { added: added, 
           total: records.length 
  };
};