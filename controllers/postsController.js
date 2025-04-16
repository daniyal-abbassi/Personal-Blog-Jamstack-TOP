const dbClient = require('../db/dbClient');

const postsController = {
    createPost: async(req,res)=>{
        const {title,content,published} = req.body;
        const {userId} = req.user;
        console.log('this should be user: ',userId)
        try {
            // const post = await dbClient.createPost()
            console.log(title,content,published,userId)
        } catch (error) {
            res.status(500).json({message: 'error in creating  post!!!'})
        }
    }
}


module.exports = postsController;