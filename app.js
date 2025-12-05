const express =require("express");
 const app=express();

const postsRoute=require("./models/posts");

app.use("/posts",postsRoute);
 module.exports =app;
