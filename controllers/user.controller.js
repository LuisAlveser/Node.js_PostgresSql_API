const models =require("../models");
const bcryptjs=require("bcryptjs");
const jwt =require("jsonwebtoken");

function singUp(req,res){
      bcryptjs.genSalt(10,function(err,salt){
          bcryptjs.hash(req.body.password,salt,function(err,hash){
                const user={
                  name: req.body.name,
                  email: req.body.email,
                  password:hash
    }
            models.User.create(user).then(result=>{
            return res.status(201).json({
            message:"User  created",
            post:result
    });
  }).catch(error=>{
           res.status(500).json({
           message:"Something went wrong",
          error:error
    });
  });
    });
      });


  
 
}
module.exports={
singUp:singUp,
}