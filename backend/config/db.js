const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true},()=>{console.log('connected')});
 
module.exports= mongoose