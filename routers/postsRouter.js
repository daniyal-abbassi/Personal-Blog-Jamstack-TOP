const {Router} = require('express');
const verifyToken = require('../middleware/verifyRoute');
const postsRouter = Router();
const jwt = require('jsonwebtoken');
const postsController = require('../controllers/postsController');

postsRouter.get('/create',verifyToken,(req,res)=>{
    res.render('createPost')
})

postsRouter.post('/create',verifyToken,postsController.createPost)


module.exports=postsRouter;