const mongoose=require('mongoose')

const Userschema= new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
      
    },
    role:{
        type:String,
        default:'client'
       
    },
    password:{
        type:String,
       
    },
    confirmation:{
        type:Boolean,
        default:false
    }
})



 const User= mongoose.model('user',Userschema)

module.exports= User