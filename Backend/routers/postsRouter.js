const {Router} = require('express');
const verifyToken = require('../middleware/verifyRoute');
const postsRouter = Router();
const jwt = require('jsonwebtoken');
const upload = require('../middleware/multerConfig');
const postsController = require('../controllers/postsController');

const upload = multer({storage: multer.memoryStorage()});
postsRouter.get('/',postsController.showPosts)

postsRouter.post('/create',upload.single('file'),verifyToken,postsController.createPost)
postsRouter.put('/edit/:postId',verifyToken,postsController.editPost)
postsRouter.delete('/:postId',verifyToken,postsController.deletePost)


postsRouter.get('/:postId/comments',postsController.getCommnets)
postsRouter.delete('/:postId/comments/:commentId',postsController.deleteComment)

module.exports=postsRouter;