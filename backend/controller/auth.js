const User = require('../model/user');
const bcrypt=require('bcryptjs')
const localstorage = require('local-storage');
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const confirmation=require('../router/middelwares/veirfy_email')



const GetAll= async(req,res)=>{
 const user= await User.find()
  res.json(user)
}

const register=  async (req,res,next)=>{
    const {body}=req
    localstorage('email',body.email)
    confirmation.main()
    const user= await User.findOne({email:body.email})
    if(user) throw Error('user exist already')
    const salt = await bcrypt.genSalt(10);
    const pass= await bcrypt.hash(body.password,salt)
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
   if(email.confirmation!=true) throw Error('anactivated account')

   const password=await bcrypt.compare(body.password,email.password)
   if(!password) throw Error('password not valid')

   const token=await jwt.sign({email},process.env.SECRET)
   if(!token) throw Error('token not generated')

   localstorage('token',token);

   const tokenverif= await jwt.verify(localstorage('token'),process.env.SECRET)
   if(!tokenverif) throw Error('token not valid')

   res.json({
    msg:"logedin",
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
    res.json({
        msg:"updated",
        data:updates})
   
}
const forgotpassword=  async(req,res)=>{
    const {body}=req
    const forget={
        email:body.email,
        password:body.password,
    }
    const user= await User.findOne({email:body.email})
    if(!user) throw Error('user not found')
     const pass= await bcrypt.hash(body.password,10)
      forget.hash=pass
      localstorage('forget',forget)
      confirmation.forget()
    res.json({
        msg:'updated',
        })
}

const logout= (req,res)=>{
    localstorage.remove('token')
    res.json({msg:"loged out"})
}

const switchto= async (req,res)=>{
   const {id}=req.body
   const data= await User.findOneAndUpdate({_id:id}, {role:"livreur"})
   if(!data) throw Error('can not switch') 
   res.json({
    msg:"switched",
    id:id,
    data:data,
})
}

const decrpttoken= async (req,res)=>{
   const {token}=req.params
   const tokn=jwt.verify(token,process.env.SECRET)
   req.data=tokn
   res.json({data:req.data.data})
}

const encrpttoken= async (req,res)=>{
   const {data}=req.body
   const token=jwt.sign({data},process.env.SECRET)
   res.json({token:token})
}


module.exports={register,login,resetpassword,logout,forgotpassword,GetAll,switchto,decrpttoken,encrpttoken}