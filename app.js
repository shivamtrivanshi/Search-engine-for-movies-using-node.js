var express = require("express");
var path = require("path");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();

//load key in app
var key = require("./config/key");

//MIDDLEWARE
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    data = [];
    res.render("index", {data: data});
});

app.get("/result", function(req, res){
    var search = req.query.search;
    request("http://www.omdbapi.com/?s="+search+"&apikey="+key.apikey, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("index", {data: data});
        }
    });
});

app.get("/result/:id", function(req, res){
    var showDetails = req.params.id;
    request("http://www.omdbapi.com/?i="+showDetails+"&apikey="+key.apikey, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("show", {data: data});
        }
    });
});

app.listen(3000 , function(){
    console.log("server started at port: 3000");
});