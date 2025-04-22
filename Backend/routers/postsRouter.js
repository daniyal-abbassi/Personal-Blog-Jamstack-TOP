const {Router} = require('express');
const verifyToken = require('../middleware/verifyRoute');
const postsRouter = Router();
const jwt = require('jsonwebtoken');
const postsController = require('../controllers/postsController');

postsRouter.get('/',postsController.showPosts)

postsRouter.post('/create',verifyToken,postsController.createPost)
postsRouter.post('/edit',verifyToken,postsController.editPost)
postsRouter.post('/delete',verifyToken,postsController.deletePost)


module.exports=postsRouter;