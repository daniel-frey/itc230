var Book = require("../models/Record.js");
exports.getAll = () => {
  return Record.find({}, (err, result) => {
    if (err) {
      return err;
    } 
    return result;
  });
};