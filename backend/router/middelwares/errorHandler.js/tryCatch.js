const tryCatch=(action)=>async(req,res)=>{
try{
   await action(req,res)
}catch(error){
res.send(error.message)
}
}

module.exports={tryCatch}