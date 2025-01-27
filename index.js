import express from "express";
import http from "http";
import {Server} from "socket.io";
import cors from "cors";


const app=express();
const server = http.createServer(app);
app.use(cors());
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173/",
        methods:["GET","POST"]
    }
});


io.on("connection",(socket)=>{

    console.log("User is connected",socket.id)

})



app.get("/",(req,res)=>{
    res.send("Hello World");
})
server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})