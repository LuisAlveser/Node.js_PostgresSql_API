const express =require("express");
 const app=express();

const postsRoute=require("./routes/posts");
const bodyParser=require("body-parser");


app.use(bodyParser.json());

app.use("/post",postsRoute);
 module.exports =app;
