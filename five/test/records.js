var expect = require("chai").expect;
var records = require("../lib/records");

describe("Records", function() {
    it("returns requested record", function(){
        var result = records.get("Hours");
        expect(result).to.deep.equal({name: "Hours", year: 1999, label: "Virgin"});
    });
    it("fails with invalid record", function(){
        var result = records.get("Does not exist");
        expect(result).to.be.undefined;
    });
    it("adds requested record", function(){
        var completeRecord = {name: "Test", year: 1999, label: "Test"};
        var result = records.add(completeRecord);
        expect(result).to.deep.equal({"RecordAction": "added", "Total": 28});
    });
    it("add fails", function(){
        var result = records.add({name : "Hours", year : 1999, label : "Virgin"});
        expect(result).to.be.undefined;
    });
    it("deletes record", function(){
        var result = records.delete("Hours");
        expect(result).to.deep.equal({"RecordAction": "deleted", "Total": 27});
    });
    it("unable to delete record", function(){
        var result = records.delete("Harry Potter");
        expect(result).to.deep.equal({"RecordAction": '', "Total": 27 });
    });
});
