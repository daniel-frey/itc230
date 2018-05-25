"use strict";

let records = require("../models/Record.js");

// return all records
exports.getAll = function() {
      return records
};

exports.getOne = function(title) {
  return records.find(function(item) {
      return item.title == title;
  });
};

exports.deleteOne = function(title) {
  const oldLength = records.length;
  movies = records.filter(function(item){
      return item.title !==title;
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