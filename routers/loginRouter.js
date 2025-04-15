const {Router} = require('express');
const loginRouter = Router();

loginRouter.get('/',(req,res)=>{
    res.render('login')
})





module.exports=loginRouter;