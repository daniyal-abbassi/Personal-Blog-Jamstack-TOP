const dbClient = require('../db/dbClient');

const postsController = {
    showPosts: async(req,res)=>{
        try {
            const posts = await dbClient.showPosts();
            console.log('postsController showPosts controller returnin posts are: ',posts)
            res.json(posts)
        } catch (error) {
            res.status(500).json({message: 'ERROR IN GETTING POSTS ROUTE'})
        }
    },
    createPost: async(req,res)=>{
        const {title,content,isPublished,imageUrl} = req.body;
        const {userId} = req.user;
        try {
            const post = await dbClient.createPost(title,content,isPublished,imageUrl,userId);
            res.status(201).json({post})
           
        } catch (error) {
            res.status(500).json({message: 'error in creating  post!!!'})
        }
    },
    deletePost: async(req,res)=>{
        try {
           
            const {userId} = req.user;
            const {postId} = req.params;
            const deletedPost = await dbClient.deletePost(postId,userId);
            
            res.status(201).json({deletedPost}); 
        } catch (error) {
            res.status(500).json({message: 'ERROR DELETING POST ROUTE'})
        }
    },
    editPost: async(req,res)=>{
        try {
            const {userId} = req.user;
            const {postId} = req.params;
            const {content,title,isPublished,imageUrl} = req.body;
            const editedPost = await dbClient.editPost(postId,title,content,isPublished,imageUrl,userId)
            res.json(editedPost)
        } catch (error) {
            res.status(500).json({message: 'ERROR EDITING POST ROUTE'})
        }
    },
    getCommnets: async(req,res)=>{
        try {
            const {postId} = req.params;
            const comments = await dbClient.getComments(postId);
            res.status(200).json(comments)
        } catch (error) {
            res.status(500).json({message: 'ERROR GETTING COMMENTS ROUTE'})
        }
    },
    deleteComment: async(req,res)=>{
        try {
            const {postId,commentId} = req.params;
            const deletedComment = await dbClient.deleteComment(postId,commentId);
            if(deletedComment) {
                res.status(200).json(deletedComment);
            } else {
                res.status(400).json('COMMNET NOT FOUND')
            }
        } catch (error) {
            res.status(500).json({message: 'ERROR DELETING COMMENT ROUTE'})
        }
    }
}


module.exports = postsController;