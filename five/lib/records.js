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
    
    exports.add = (newRecord) => {
        // for(var i = 0; i < records.length; i++){
        //     if(newRecord.name == records[i].name){
        //         return;
        //     }
        // }
        // var recordLen = records.length;
        // var recordName = newRecord.name;
        // var recordYear = newRecord.year;
        // var recordLabel = newRecord.label;
        // var completeRecord = {name : recordName, year : recordYear, label : recordLabel};
        
        // records.push(completeRecord);
        // var added = (records.length == recordLen) ? "" : "added";
        // return {"RecordAction": added, "Total": records.length};
        
        var found = false;
        records.forEach(function(item,index){
            if (item.name == newRecord.name) {
                found = true;
            }
        });
        if (!found) {
            newRecord.id = records.length;
            records.push(newRecord);
        }
        var action = (found) ? "updated" : "added";
        return {"RecordAction": action, "Total": records.length };
     };
    
    exports.allRecords = () => {
        return records;
    };