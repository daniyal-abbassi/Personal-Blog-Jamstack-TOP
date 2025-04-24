const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dbClient = {
    createUser: async (username, password) => {
        try {
            const user = await prisma.user.create({
                data: {
                    username,
                    password
                }
            })
            return user;
        } catch (error) {
            console.error(`ERROR CREATING USER: ${error}`)
            throw error
        }
    },
    searchUser: async (username) => {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    username
                }
            })
            return user;
        } catch (error) {
            console.error(`ERROR SEARCHING USER: ${error}`)
            throw error
        }
    },
    searchUserById: async (userId) => {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    user_id: userId
                }
            })
            return user;
        } catch (error) {
            console.error(`ERROR SEARCHING USER WITH ID: ${error}`)
            throw error
        }
    },
    //POSTS
    showPosts: async()=>{
        try {
            const posts = await prisma.post.findMany();
            console.log('dbClient showPosts posts are: ',posts)
            return posts;
        } catch (error) {
            console.error('ERROR GETTING ALL POSTS: ',error)
            throw error
        }
    },
    createPost: async(title,content,isPublished,imageUrl,author_id) => {
        try {
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    isPublished,
                    imageUrl,
                    author_id
                }
            })
            return post;
        } catch (error) {
            console.error('ERROR CREATING POST: ',error)
            throw error
        }
    },
    deletePost: async(post_id,user_id)=>{
        const parsedPostId = parseInt(post_id);
        const parsedUserId = parseInt(user_id);
        try {
            const deletedPost = await prisma.post.delete({
                where: {
                    post_id: parsedPostId,
                    author_id: parsedUserId
                }
            })
            return deletedPost;
        } catch (error) {
            console.error('ERROR DELETING POST: ',error)
            throw error
        }
    },
    editPost: async(post_id,title,content,isPublished,imageUrl,user_id) => {
        try {
            const editedPost = await prisma.post.update({
                where: {
                    post_id
                },
                data: {
                    title,
                    content,
                    isPublished,
                    imageUrl
                }
            })
            return editedPost
        } catch (error) {
            console.error('ERROR UPDATING POST: ',error)
            throw error
        }
    },
    //comments 
    getComments: async(postId)=>{
        try {
            const comments = await prisma.comment.findMany({
                where: {
                    post_id: postId
                }
            })
            return comments;
        } catch (error) {
            console.error('ERROR GETTING COMMENTS DATABASE: ',error)
            throw error
        }
    },
    deleteComment: async(postId,commentId)=>{
        try {
            const deletedComment = await prisma.comment.delete({
                where: {
                    post_id: postId,
                    comment_id: commentId
                }
            })
            return deletedComment;
        } catch (error) {
            console.error('ERROR DELETING COMMENT: ',error)
            throw error
        }
    }
}



module.exports = dbClient;