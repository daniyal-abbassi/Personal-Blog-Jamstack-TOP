const dbClient = require('../db/dbClient');
const cloudinary = require('../utils/cloudinaryConfig');

const postsController = {
    showPosts: async (req, res) => {
        try {
            const posts = await dbClient.showPosts();
            res.json(posts)
        } catch (error) {
            res.status(500).json({ message: 'ERROR IN GETTING POSTS ROUTE' })
        }
    },
    createPost: async (req, res) => {
        const { title, tag, content, isPublished } = req.body;
        const { userId } = req.user;
        const { file } = req;

        try {
            //look for existing tag
            var exisTag = await dbClient.searchTag(tag);
            if (exisTag) {
                console.error('pre-tag: ',exisTag)
                var { tag_id } = exisTag;
                console.warn('tag_id: ',tag_id)
            } else {
                console.warn('no pre tag',exisTag)
                var { tag_id } = await dbClient.createTag(tag);
            }


            //upload to cloudinary
            const result = await cloudinary.uploader.upload(file.path,

                //callback 
                async (error, result) => {
                    if (error) {
                        return res.status(500).send('Failed to Upload file to clouds.')
                    }
                    const { url, public_id } = result;
                    const post = await dbClient.createPost(title, tag_id, content, isPublished, url, public_id, userId);
                    //test
                    res.status(201).json({ post })
                }
            )

        } catch (error) {
            res.status(500).json({ message: 'error in creating  post!!!' });
            console.error('Error creating post: ', error)
        }
    },
    deletePost: async (req, res) => {
        try {

            const { userId } = req.user;
            const { postId } = req.params;
            const deletedPost = await dbClient.deletePost(postId, userId);

            res.status(201).json({ deletedPost });
        } catch (error) {
            res.status(500).json({ message: 'ERROR DELETING POST ROUTE' })
        }
    },
    editPost: async (req, res) => {
        try {
            const { userId } = req.user;
            const { postId } = req.params;
            const { title, tag, content, isPublished } = req.body;
            const { file } = req;
            //if no file was edited
            if (!file) {
                const editedPost = await dbClient.editPostWithOutFile(postId, title, tag, content, isPublished, userId);
                res.json(editedPost)
            } else {

                //if new image uploaded
                await cloudinary.uploader.upload(file.path, async (err, result) => {
                    if (err) {
                        return res.status(500).send('Failed to upload to cloud.')
                    }
                    //delete previous image
                    const previousPost = await dbClient.getPost(postId);
                    cloudinary.uploader.destroy(previousPost.coudinaryId);
                    const editedPost = await dbClient.editPostWithFile(postId, title, tag, content, result.url, result.public_id, isPublished, userId);
                    res.json(editedPost);
                })
            }
        } catch (error) {
            console.log('in controller problem', error)
            res.status(500).json({ message: 'ERROR EDITING POST ROUTE' })
        }
    },
    getCommnets: async (req, res) => {
        try {
            const { postId } = req.params;
            const comments = await dbClient.getComments(postId);
            res.status(200).json(comments)
        } catch (error) {
            res.status(500).json({ message: 'ERROR GETTING COMMENTS ROUTE' })
        }
    },
    deleteComment: async (req, res) => {
        try {
            const { postId, commentId } = req.params;
            const deletedComment = await dbClient.deleteComment(postId, commentId);
            if (deletedComment) {
                res.status(200).json(deletedComment);
            } else {
                res.status(400).json('COMMNET NOT FOUND')
            }
        } catch (error) {
            res.status(500).json({ message: 'ERROR DELETING COMMENT ROUTE' })
        }
    }
}


module.exports = postsController;