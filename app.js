"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false
}));
app.get("/c/:id", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    console.log("new request : " +req.params['id']);
    try{
    (new (require("hsoub")).io()).community(req.params['id'], null, function (err, tres) {
        if (err) {
            console.log(err);
            return;
        }
        var data = {
            name: tres.name,
            followers: tres.followers,
            image: tres.image,
            description: tres.description,
            url: tres.url,
        };
        console.log(data);
        res.send(JSON.stringify(data,null,4));
        res.end();
    });
    }catch(e){
        console.log(e);
    }
});
app.listen((process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 80), process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function () {
    console.log("Server Runner: http://localhost:80/");
});
