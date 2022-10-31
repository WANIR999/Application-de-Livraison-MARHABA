const router= require('express').Router();
const manager=require('../../controller/auth')
const verification=require('../middelwares/token_verification')
const localstorage = require('local-storage');
const verfemail=require('../middelwares/veirfy_email')
const {tryCatch}=require('../middelwares/errorHandler.js/tryCatch')


router.post('/register',verification.postverif,tryCatch(manager.register))

router.post('/login',verification.postverif,tryCatch(manager.login))

// router.get('/loginform',verification.postverif,manager.loginform)
// router.get('/registerform',verification.postverif,manager.registerform)

// router.get('/forgotpasswordform',verification.postverif,manager.forgoten)
router.post('/forgotpassword',verification.postverif,tryCatch(manager.forgotpassword))

// router.get('/resetpassword/:token',verification.verify(["manager","admin","client","livreur"]),manager.resetform)
router.post('/resetpassword',verification.verify(["manager","admin","client","livreur"]),tryCatch(manager.resetpassword))

router.get('/logout',verification.verify(["manager","admin","client","livreur"]),tryCatch(manager.logout))
router.get('/confirmation/:email_token',verfemail.conform)
router.get('/email_confirmation/:email_token',verfemail.confirm)

module.exports= router;