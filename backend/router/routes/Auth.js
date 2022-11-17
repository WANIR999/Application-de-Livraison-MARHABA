const router= require('express').Router();
const user=require('../../controller/auth')
const verification=require('../middelwares/token_verification')
const localstorage = require('local-storage');
const verfemail=require('../middelwares/veirfy_email')
const {tryCatch}=require('../middelwares/errorHandler/tryCatch')
const errorHandler=require('../middelwares/errorHandler/errorhandler')


router.post('/register',verification.postverif,tryCatch(user.register))

router.post('/login',tryCatch(verification.postverif),tryCatch(user.login))


router.post('/forgotpassword',tryCatch(user.forgotpassword))

router.post('/resetpassword',verification.verify(["manager","admin","client","livreur"]),tryCatch(user.resetpassword))

router.get('/logout',verification.verify(["manager","admin","client","livreur"]),tryCatch(user.logout))
router.get('/confirmation/:email_token',verfemail.confirm)
router.get('/forgetconfirm/:token',verfemail.forgetconfirm)

router.get('/allUsers',verification.verify(["manager","client"]),user.GetAll)

router.post('/switchtoliv',user.switchto)

router.use(errorHandler)

module.exports= router;