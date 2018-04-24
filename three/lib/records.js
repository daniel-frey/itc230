"use strict";

let records = [
    {name : "Under the Table and Dreaming", year : 1994, label : "RCA"},
    {name : "Crash", year : 1996, label : "RCA"},
    {name : "Before These Crowded Streets", year : 1998, label : "RCA"},
    {name : "Everyday", year : 2001, label : "RCA"},
    {name : "Busted Stuff", year : 2001, label : "RCA"},
    {name : "Stand Up", year : 2005, label : "RCA"},
    {name : "Big Whiskey & The GrooGrux King", year : 2009, label : "RCA"},
    {name : "Away from the World", year : 2009, label : "RCA"},
    ];
    
    exports.get = (name) => {
        return records.find((item) => {
            return item.name == name;
        });
    };
    
    exports.delete = (name) => {
        var recordLen = records.length;
        records = records.filter((item) => {
            return item.name !== name;
        });
        var deleted = (records.length == recordLen) ? "" : "deleted";
        return { "RecordAction": deleted, "Total": records.length};
    };
    // assignment 2 stuffs
    // exports.add = (newRecord) => {
    //     var recordName = newRecord.name;
    //     var recordYear = newRecord.year;
    //     var recordLabel = newRecord.label;
    //     var completeRecord = {name : recordName, year : recordYear, label : recordLabel};
    //     records.push(completeRecord);
    // };
    
    // exports.allRecords = () => {
    //     return records;
    // };
    