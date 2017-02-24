import { io } from "hsoub";
import * as express from "express";
const app = express();
const api = new io();
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
            res.send(data);
        });

    }
);

app.listen((process.env.PORT || 80),()=>{
    console.log(`Server Runner: http://localhost:80/`)
})