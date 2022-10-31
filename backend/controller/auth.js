const User = require('../model/user');
const bcrypt=require('bcryptjs')
const localstorage = require('local-storage');
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const confirmation=require('../router/middelwares/veirfy_email')

const register=  async (req,res,next)=>{
    const {body}=req
    localstorage('email',body.email)

    const user= await User.findOne({email:body.email})
    if(user) throw Error('user exist already')

    const pass= await bcrypt.hash(body.password,10)
    body.password=pass
    const creat= await User.create({...body})
    if(!creat) throw Error('user not created')
    res.json({msg:"created",
        data:creat
    })

}
const login= async (req,res)=>{
    const {body}=req

   const email = await User.findOne({email:body.email})
   if(!email) throw Error('email not found')
//    if(email.confirmation!=true) throw Error('anactivated account')

   const password=await bcrypt.compare(body.password,email.password)
   if(!password) throw Error('password not valid')

   const token=await jwt.sign({email},process.env.SECRET)
   if(!token) throw Error('token not generated')

   localstorage('token',token);

   const tokenverif= await jwt.verify(localstorage('token'),process.env.SECRET)
   if(!tokenverif) throw Error('token not valid')

   res.json({
    token:localstorage('token'),
    data:email
   })
       
}
const resetpassword= async (req,res)=>{
    const  {body}=req
    const user= await User.findOne({email:body.email})
    if(!user) throw Error('user not found')
    const pass= await bcrypt.hash(body.password,10)
    const updates= await User.findOneAndUpdate({email:body.email}, {password:pass})
    if(!updates) throw Error('not updated')
    res.json({updates})
   
}
const forgotpassword=  async(req,res)=>{
    const {body}=req
    const user= await User.findOne({email:body.email})
    if(!user) throw Error('user not found')
     const pass= await bcrypt.hash(body.password,10)
     if(!pass) throw Error('password not hashed')
     const updates= await User.findOneAndUpdate({email:body.email}, {password:pass})
    if(!updates) throw Error('not updated')
    res.json({
        msg:'updated',
        data:updates})
}

const logout= (req,res)=>{
    localstorage.remove('token')
    res.json({msg:"loged out"})
}


module.exports={register,login,resetpassword,logout,forgotpassword}