const {Router} = require('express')
const signupRouter = Router();
const signUpController = require('../controllers/signUpController');



signupRouter.get('/',(req,res)=>res.render('signup'))

//sign the jwt and pass it as token
signupRouter.post('/',signUpController.signUpPost)

module.exports=signupRouter;