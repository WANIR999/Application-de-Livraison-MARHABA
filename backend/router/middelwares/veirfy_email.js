const nodemailer = require("nodemailer");
const ls=require('local-storage')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const User=require('../../model/user')


function main() {
 
    const email_token=jwt.sign({email:ls('email')},process.env.SECRET)
    const url='http://localhost:8080/api/auth/confirmation/'+email_token;
 
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'mohammedwanir67@gmail.com', 
      pass: 'jxmgbkafeztunkxd', 
    },
  });


  let info = {
    from: '"mohammed" <mohammedwanir67@gmail.com>', 
    to:ls('email'),
    subject: "email verification ✔",  
    html: '<b>Hello we just got a request to create an account with this email, please verify in this link <a href="'+url+'">confirm it</a></b>',
  };
  transporter.sendMail(info)
}

function conform(req,res){
   const {email_token}=req.params
res.render('email_confirmation',{email_token})
}

function confirm(req,res){
  const tkn=jwt.verify(req.params.email_token,process.env.SECRET)
  req.email=tkn
  User.findOneAndUpdate({email:req.email.email},{confirmation:true}).then(()=>{
    res.render('errorview',{data:{
        msg:"comfirmed!!",
        statu:'confirmation',
        class:'bg-success'
    }})
  })

}
module.exports= {main,conform,confirm}
