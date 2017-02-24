"use strict";
exports.__esModule = true;
var hsoub_1 = require("hsoub");
var express = require("express");
var app = express();
var api = new hsoub_1.io();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/", function (req, res) {
    api.community('webdev', null, function (err, tres) {
        if (err) {
            console.log(err);
            return;
        }
        var data = {
            name: tres.name,
            followers: tres.followers,
            image: tres.image,
            description: tres.description
        };
        console.log(data);
        res.send(data);
    });
});
app.listen((process.env.PORT || 80), function () {
    console.log("Server Runner: http://localhost:80/");
});
