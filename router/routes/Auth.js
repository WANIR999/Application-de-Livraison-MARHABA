const router= require('express').Router();
const manager=require('../../controller/auth')
const verification=require('../middelwares/token_verification')
const localstorage = require('local-storage');


router.post('/register',verification.postverif,manager.register)

router.post('/login',verification.postverif,manager.login)

router.get('/loginform',verification.postverif,manager.loginform)
router.get('/registerform',verification.postverif,manager.registerform)

router.get('/forgotpasswordform',verification.postverif,manager.forgoten)
router.post('/forgotpassword',verification.postverif,manager.forgotpassword)

router.get('/resetpassword/:token',verification.verify(["manager","admin","client","livreur"]),manager.resetform)
router.post('/resetpassword',verification.verify(["manager","admin","client","livreur"]),manager.resetpassword)

router.get('/logout',verification.verify(["manager","admin","client","livreur"]),manager.logout)

module.exports= router;