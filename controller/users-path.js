const localstorage=require('local-storage')
const jwt=require('jsonwebtoken')
const clientview=(req,res)=>{
    const token=jwt.verify(localstorage('token'),process.env.SECRET)
    req.user=token
    res.render('client-view',{data:req.user.user,
        token:localstorage('token'),
    })
}

module.exports={clientview}