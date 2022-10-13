const mongoose=require('mongoose')

const Userschema= new mongoose.Schema({
    name:{
        type:String,
        requored:true,
    },
    email:{
        type:String,
        requored:true,
    },
    role:{
        type:String,
        requored:true,
    },
    password:{
        type:String,
        requored:true,
    }
})



 const User= mongoose.model('user',Userschema)

module.exports= User