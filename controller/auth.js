const User = require('../model/user');
const bcrypt=require('bcryptjs')
const localstorage = require('local-storage');
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

const register=  (req,res)=>{
    const {body}=req
    User.findOne({email:body.email}).then(e=>{
        if(e){
            res.render('errorview',{data:{msg:'email existe already',statu:'??',class:"bg-warning"}})
        }else{
           bcrypt.hash(body.password,10).then(hash=> {
            body.password=hash
            User.create({...body}).then(user=>{
                res.redirect('/api/auth/loginform')
               }).catch(()=>{
                res.render('errorview',{data:{msg:'not added',statu:'??'}})
               })
        });
          
        }
    })
}
const login=  (req,res)=>{
    const {body}=req
    User.findOne({email:body.email}).then(e=>{
        if(e){
            const user=e
            bcrypt.compare(body.password,e.password).then(e=>{
                if(e){
                   const token= jwt.sign({user},process.env.SECRET,{expiresIn:'30d'})
                   localstorage('token',token);
                   const tokenverif=jwt.verify(localstorage('token'),process.env.SECRET)
                   req.user=tokenverif
                   res.redirect('http://localhost:8080/api/user/'+req.user.user.role)
                  
                }else{
                    res.render('errorview',{data:{msg:'invalid password',statu:'??',class:"bg-danger"}})
                }
            });
        }else{
            res.render('errorview',{data:{msg:'invalid email',statu:'??',class:"bg-danger"}})
        }
    })
       
}
const resetpassword=  (req,res)=>{
    const  {body}=req
    User.findOne({email:body.email}).then(e=>{
        if(e){
            bcrypt.hash(body.password,10).then(e=>{
                User.findOneAndUpdate({email:body.email}, {password:e}).then(()=>{
                    res.redirect('http://localhost:8080/api/user/'+req.user.user.role)
                }).catch(()=>{
                    res.render('errorview',{data:{msg:'not modified',statu:"??",class:"bg-danger"}})
                })
            })

        }else{
            res.render('errorview',{data:{msg:'email not found',statu:402,class:"bg-danger"}})
        }
        
    })
   
}
const forgotpassword=  (req,res)=>{
    const {body}=req
    User.findOne({email:body.email}).then(e=>{
        if(e){
            bcrypt.hash(body.password,10).then(e=>{
                User.findOneAndUpdate({email:body.email}, {password:e}).then(()=>{
                    res.redirect('http://localhost:8080/api/auth/loginform')
                }).catch(()=>{
                    res.render('errorview',{data:{msg:'not modified',statu:"??",class:"bg-danger"}})
                })
            })

        }else{
            res.render('errorview',{data:{msg:'email not found',statu:402,class:"bg-danger"}})
        }
        
    })
   
}
const logout=(req,res)=>{
    localstorage.remove('token')
    res.redirect('loginform')
}
const forgoten=(req,res)=>{
    res.render('forgotpassword')
}
const loginform=(req,res)=>{
    res.render('login')
}
const resetform=(req,res)=>{
    const {token}=req.params
    const verif=jwt.verify(token,process.env.SECRET)
    req.user=verif
    res.render('resetpass',{email:req.user.user.email})
}
const registerform=(req,res)=>{
    res.render('register')
}

module.exports={register,login,resetpassword,logout,loginform,registerform,forgoten,forgotpassword,resetform}