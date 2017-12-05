/*
Module Dependencies
*/
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb');
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

var environment = require('./configuration/environment.json');

module.exports = {"applicationObject":app}

// DB connection
MongoClient.connect(environment.dbConnection.url,function(error,dbConnectionObject){
    if(error){
        console.log("error"+error);
    }else{
        console.log("Connection open done");
        require('./route/routes.js')(app,dbConnectionObject);
        app.listen(app.get('port'),function(error){
        if(error){
            throw error;
        }
        console.log("Node Server started..");
    });
    }
});


