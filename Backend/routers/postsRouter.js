const {Router} = require('express');
const verifyToken = require('../middleware/verifyRoute');
const postsRouter = Router();
const jwt = require('jsonwebtoken');
const postsController = require('../controllers/postsController');

postsRouter.get('/',postsController.showPosts)

postsRouter.post('/create',verifyToken,postsController.createPost)
postsRouter.put('/edit/:postId',verifyToken,postsController.editPost)
postsRouter.delete('/delete/:postId',verifyToken,postsController.deletePost)


postsRouter.get('/:postId/comments',postsController.getCommnets)
postsRouter.delete('/:postId/comments/:commentId',postsController.deleteComment)

module.exports=postsRouter;