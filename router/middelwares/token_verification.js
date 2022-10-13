const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const localstorage = require('local-storage');

function verify(access){
  return (req,res,next)=>{
    if(localstorage('token')){
       if(jwt.verify(localstorage('token'),process.env.SECRET)){
        const token=jwt.verify(localstorage('token'),process.env.SECRET)
            req.user=token     
            if(access.includes(req.user.user.role)){
                next()
            }else{
              res.render('errorview',{data:{msg:'anauthorised',statu:401}})
            }
       }else{
        res.render('errorview',{data:{msg:'anauthenticated',statu:402}})
       }   
    
     }else{
      res.render('errorview',{data:{msg:'anauthenticated',statu:402}})
       }   
    }
}
function postverif(req,res,next){
    if(localstorage('token')){
       if(jwt.verify(localstorage('token'),process.env.SECRET)){
        const token=jwt.verify(localstorage('token'),process.env.SECRET)
            req.user=token     
            res.redirect('http://localhost:8080/api/user/'+req.user.user.role)
       }else{
        next()
       }   
    
     }else{
      next()
       }   
    }








module.exports= {verify,postverif}