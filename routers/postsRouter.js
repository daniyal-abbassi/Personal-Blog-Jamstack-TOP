const {Router} = require('express');
const postsRouter = Router();


postsRouter.get('/create',(req,res)=>{
    res.render('createPost')
})



module.exports=postsRouter;