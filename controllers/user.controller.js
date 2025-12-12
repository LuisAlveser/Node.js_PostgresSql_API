const models =require("../models");
const bcryptjs=require("bcryptjs");
const jwt =require("jsonwebtoken");
const { where } = require("sequelize");
const Validator=require("fastest-validator");
function singUp(req,res){
   
    models.User.findOne({
        where:{email:req.body.email}
    }).then(result=>{
        if(result){
             res.status(409).json({
             message:"Email already existis!!"
             });
        }
        else{
              bcryptjs.genSalt(10,function(err,salt){
          bcryptjs.hash(req.body.password,salt,function(err,hash){
                const user={
                  name: req.body.name,
                  email: req.body.email,
                  password:hash
    }
      const schema={/// Faz a validação dos campos 
       nome:{type:"string",optional:false,max:100},
       email:{type:"email",optional:false,max:50},
       password:{type:"string",optional:false},
     }
     const v= new Validator();
   
     const validatorResponse=v.validate(user,schema);
       if(validatorResponse!==true){
    return res.status(404).json({
      message:"Validation failed",
      erros: validatorResponse
    });
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
    }).catch(error=>{
        return res.status(500).json({
        message: "Database search error",
        error: error
 });
        
    });

}
function login(req,res){
    models.User.findOne({where:{email:req.body.email}}).then(user=>{
      if(user===null){
             return res.status(401).json({
        message: "Invalid credentials!!",
       
 });
      }
      else{
        bcryptjs.compare(req.body.password,user.password,function(error,result){
         if(result){
            const token= jwt.sign({
                email:user.email,
                userId:user.id
            },'secret', function(error,token){
                          return res.status(200).json({
                          message: "Authentication successful",
                          token:token
       
 });
            });
         }
         else{
                  return res.status(500).json({
        message: "Database search error",
        error: error
 });
         }
        });
      }
    }).catch(erro=>{
         return res.status(500).json({
        message: "Database search error",
        erro: erro
 });
    });

}
module.exports={
singUp:singUp,
login:login,

}