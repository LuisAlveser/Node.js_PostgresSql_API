const express =require("express");
 const app=express();

const postsRoute=require("./routes/posts");
const bodyParser=require("body-parser");
const usersRoute=require("./routes/users");
const imagemRouter= require("./routes/images");
app.use(bodyParser.json());
app.use("/uploads",express.static("uploads"));
app.use("/post",postsRoute);
app.use("/user",usersRoute);
app.use("/images",imagemRouter);
 module.exports =app;
