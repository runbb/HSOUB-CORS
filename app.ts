import { io } from "hsoub";
import * as express from "express";
const app = express();
const api = new io();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }});

app.get(
    "/",
    (req, res)=>{
        api.community('webdev',null,(err,tres)=>{
            if(err){    
                console.log(err); return;
            }
            let data = {
                name: tres.name,
                followers: tres.followers,
                image: tres.image,
                description: tres.description,
            }
            console.log(data);
            res.send(data);
        });

    }
);

app.listen((process.env.PORT || 80),()=>{
    console.log(`Server Runner: http://localhost:80/`)
})