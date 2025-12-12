const jwt =require("jsonwebtoken");

function checkAuth(req,res,next){
    try{
      const token= req.headers.authorization.split(" ")[1];
      const decodedToken=jwt.verify(token,"secret");
      req.userData=decodedToken;
      next();
    }catch(e ){
        return res.status(401).json({
            'message': "Invalid or expired toke provided!",
             "error":e 
        });
    }
}
module.exports={
<<<<<<< HEAD
    checkAuth:checkAuth,
=======
    checkAuth:checkAuth
>>>>>>> e2599f31f31333e96a05a6bda171f06a48b35a02
}