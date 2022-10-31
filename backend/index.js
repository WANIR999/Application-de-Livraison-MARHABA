const express=require('express')
const app=express()
const db=require('./config/db')
// const AppError=require('./router/middelwares/errorhandler/Apperror')
const auth= require('./router/routes/Auth')
const user= require('./router/routes/user')
// const errorHandler = require('./router/middelwares/errorhandler/errorhandler')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',auth)
app.use('/api/user',user)






app.listen(8080);
