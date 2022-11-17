const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const localstorage = require('local-storage');

function verify(access){
  return (req,res,next)=>{
    if(localstorage('token')){
       if(jwt.verify(localstorage('token'),process.env.SECRET)){
        const token=jwt.verify(localstorage('token'),process.env.SECRET)
            req.email=token     
            if(access.includes(req.email.email.role)){
                next()
            }else{
              res.json({errmsg:'anauthorised',statu:401})
            }
       }else{
        res.json({errmsg:'anauthenticated',statu:402})
       }   
    
     }else{
      res.json({errmsg:'anauthenticated',statu:402})
       }   
  }
}
function postverif(req,res,next){
  if(localstorage('token')) throw Error('you are loged in!!')
  next()
}








module.exports= {verify,postverif}