"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});
app.get("/:id", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    console.log("new request : " +req.params['id']);
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
    });
});
app.listen((process.env.PORT || 80), function () {
    console.log("Server Runner: http://localhost:80/");
});
