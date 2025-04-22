const dbClient = require('../db/dbClient');

const postsController = {
    showPosts: async(req,res)=>{
        try {
            const posts = dbClient.showPosts();
            res.json(posts)
        } catch (error) {
            res.status(500).json({message: 'ERROR IN GETTING POSTS ROUTE'})
        }
    },
    createPost: async(req,res)=>{
        const {title,content,published} = req.body;
        const {userId} = req.user;
        try {
            console.log(title,content,published,userId)
            const post = await dbClient.createPost(title,content,'published',userId);
            console.log('this is post: ',post)
        } catch (error) {
            res.status(500).json({message: 'error in creating  post!!!'})
        }
    },
    deletePost: async(req,res)=>{
        try {
            const {userId} = req.user;
            const {post_id} = req.params;
            await dbClient.deletePost(post_id,userId);
        } catch (error) {
            res.status(500).json({message: 'ERROR DELETING POST ROUTE'})
        }
    },
    editPost: async(req,res)=>{
        try {
            const {userId} = req.user;
            const {post_id} = req.params;
            const {content,title,published} = req.body;
            const editedPost = await dbClient.editPost(post_id,title,content,published,userId)
            res.json(editedPost)
        } catch (error) {
            res.status(500).json({message: 'ERROR EDITING POST ROUTE'})
        }
    }
}


module.exports = postsController;