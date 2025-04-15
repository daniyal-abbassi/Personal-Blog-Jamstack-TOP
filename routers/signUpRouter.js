const {Router} = require('express')
const signupRouter = Router();
const dbClient = require('../db/dbClient');
signupRouter.get('/',(req,res)=>res.render('signup'))

signupRouter.post('/',(req,res)=>{
    const {username,password} = req.body;
    
})

module.exports=signupRouter;