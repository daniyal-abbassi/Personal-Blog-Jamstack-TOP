const {Router} = require('express');
const loginRouter = Router();
const loginController = require('../controllers/loginController');





loginRouter.get('/',(req,res)=>{
    res.render('login')
})

loginRouter.post('/',loginController.loginPost)




module.exports=loginRouter;