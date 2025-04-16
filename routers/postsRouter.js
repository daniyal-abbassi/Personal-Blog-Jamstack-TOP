const {Router} = require('express');
const verifyToken = require('../middleware/verifyRoute');
const postsRouter = Router();
const jwt = require('jsonwebtoken');

postsRouter.get('/create',verifyToken,(req,res)=>{
    res.render('createPost')
})



module.exports=postsRouter;