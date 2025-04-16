const dbClient = require('../db/dbClient');

const postsController = {
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
    }
}


module.exports = postsController;