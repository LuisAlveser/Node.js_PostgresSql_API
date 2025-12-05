function index(req,res){
    const posts="Fala ";
  res.send(posts);
}


module.exports={
    index:index,
}