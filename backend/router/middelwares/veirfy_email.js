const nodemailer = require("nodemailer");
const ls=require('local-storage')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const User=require('../../model/user')
const bcrypt=require('bcryptjs')


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

function forget() {

 
    const forget_data=jwt.sign({data:ls('forget')},process.env.SECRET)
    const url='http://localhost:8080/api/auth/forgetconfirm/'+forget_data;
    
    // console.log(ls('forget'))
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
    to:ls('forget').email,
    subject: " password confirmation ✔",  
    html: '<b>Hello we just got a request to change your password to '+ls('forget').password+', if it was you please  <a href="'+url+'">confirm it</a></b>',
  };
  transporter.sendMail(info)
}



async function confirm(req,res){
  const tkn= await jwt.verify(req.params.email_token,process.env.SECRET)
  req.email=tkn
  const user= await User.findOneAndUpdate({email:req.email.email},{confirmation:true})
   if(user)  res.redirect('http://localhost:3000/login');
}

async function forgetconfirm(req,res){
  const tkn= await jwt.verify(req.params.token,process.env.SECRET)
  req.data=tkn
  const user= await User.findOneAndUpdate({email:req.data.data.email},{password:req.data.data.hash})
   if(user) res.redirect('http://localhost:3000/login');
}
module.exports= {main,confirm,forget,forgetconfirm}
