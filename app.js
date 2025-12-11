const express =require("express");
 const app=express();

const postsRoute=require("./routes/posts");
const bodyParser=require("body-parser");
const usersRoute=require("./routes/users");

app.use(bodyParser.json());

app.use("/post",postsRoute);
app.use("/user",usersRoute);
 module.exports =app;
