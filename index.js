import express from "express";
const a=express();
a.get("/",(req,res)=>{
    res.send("Hello World");
})
a.listen(3000,()=>{
    console.log("Server is running on port 3000");
})