const { where } = require("sequelize");
const models= require("../models");
const Validator=require("fastest-validator");



function save(req,res){
  const post={
      title: req.body.title,
       content:req.body.content ,
    imagemUrl: req.body.imagemUrl,
    categoryId:req.body.categoryId,
    userId: 1
  }
  const schema={/// Faz a validação dos campos 
    title:{type:"string",optional:false,max:100},
    content:{type:"string",optional:false,max:500},
    categoryId:{type:"number",optional:false},
  }
  const v= new Validator();

  const validatorResponse=v.validate(post,schema);

  if(validatorResponse!==true){
    return res.status(404).json({
      message:"Validation failed",
      erros: validatorResponse
    });
  }
  models.Post.create(post).then(result=>{
    return res.status(201).json({
      message:"Post created",
      post:result
    });
  }).catch(error=>{
          res.status(500).json({
      message:"Something went wrong",
      error:error
    });
  });
  
}
function show (req,res){
  const id =req.params.id;

  models.Post.findByPk(id).then(result=>{
    if(result){
  return  res.status(200).json(result);
    }else{
      res.status(500).json({
      message:"Post not found"
     });
    }
   
  }).catch(error=>{
     res.status(500).json({
      message:"Something went wrong"
     });
  });

}

function index (req,res){
  models.Post.findAll().then(result=>{
         res.status(200).json(result);
    }
  ).catch(error=>{
      res.status(500).json({
         message:"Something went wrong"
    });
  });

}
function update(req,res){
   const id =req.params.id;
  
   const  updatedPost={
     title: req.body.title,
       content:req.body.content ,
    imagemUrl: req.body.imagemUrl,
    categoryId:req.body.categoryId,
   }
 const userId=1;
   const schema={/// Faz a validação dos campos 
    title:{type:"string",optional:false,max:100},
    content:{type:"string",optional:false,max:500},
      categoryId:{type:"number",optional:false},
  
  }
  const v= new Validator();

  const validatorResponse=v.validate(updatedPost,schema);

  if(validatorResponse!==true){
    return res.status(404).json({
      message:"Validation failed",
      erros: validatorResponse
    });
  }
 models.Post.update(updatedPost,{where:{id:id,userId:userId}}).then(result=>{
    res.status(200).json({
         message:"Post updated successful",
         Post:updatedPost
         
    });
 }).catch(
  error=>{
      res.status(500).json({
         message:"Something went wrong"
    });
  }
 );
}

function destroy(req,res){
  const id =req.params.id;
  const userId=1;
  models.Post.destroy({where:{id:id,userId:userId}}).then(result=>{
    res.status(204).json({
         message:"Post deleted successful",   
    });
 }).catch(  error=>{
      res.status(500).json({
         message:"Something went wrong"
    });
  });
}


module.exports={
    index:index,
    save:save,
    show:show,
  update:update,
  destroy:destroy
}