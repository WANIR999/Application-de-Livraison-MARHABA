const express=require('express')
const app=express()
const db=require('./config/db')
const auth= require('./router/routes/Auth')
const user= require('./router/routes/user')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')

app.use('/api/auth',auth)
app.use('/api/user',user)






app.listen(8080);
