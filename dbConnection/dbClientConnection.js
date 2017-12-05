/*
 Dependency Creation
*/
var environment = require('../configuration/environment.json');
var MongoClient = require('mongodb').MongoClient;
//Variable Creation
var dbConnectionObject;

MongoClient.connect(environment.dbConnection.url,function(error,dbConnectionObject){
    if(error){
        console.log("error"+error);
    }else{
        console.log("Connection open done");
        module.exports = dbConnectionObject;
    }
});
