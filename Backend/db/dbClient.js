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
    //TAG
    getTags: async()=>{
        try {
            const tags = await prisma.tag.findMany();
            return tags;
        } catch (error) {
            console.error(`ERROR GETTING TAGS: ${error}`)
            throw error 
        }
    },
    createTag: async(tag)=>{
        try {
            const newTag = await prisma.tag.create({
                data: {
                    tag
                }
            });
            return newTag;
        } catch (error) {
            console.error(`ERROR CREATING TAG: ${error}`)
            throw error
            
        }
    },
    searchTag: async(tag)=>{
        try {
            const exiTag = await prisma.tag.findFirst({
                where: {tag}
            })
            return exiTag;
        } catch (error) {
            console.error(`ERROR SEARCHING TAG: ${error}`)
            throw error
            
        }
    },
    //POSTS
    showPosts: async()=>{
        try {
            const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        username: true,
                    }
                },
                tag: true,
            },
            where: {
                isPublished: true,
            }    
            });
            return posts;
        } catch (error) {
            console.error('ERROR GETTING ALL POSTS: ',error)
            throw error
        }
    },
    getPost: async(postId)=>{
        const parsedPostId = parseInt(postId);
        try {
            const post = await prisma.post.findUnique({
                where: {
                    post_id: parsedPostId
                },
                include: {
                    author: {
                        select: {
                            username: true,
                        }
                    },
                    tag: true,
                }
            })
            return post;
        } catch (error) {
            console.error('ERROR FINDING POST',error);
            throw error;
        }
    },
    createPost: async(title,tag_id,content,isPublished,url,coudinaryId,author_id) => {
        if(isPublished==="true") isPublished=true
        else isPublished=false
        try {
            const post = await prisma.post.create({
                data: {
                    title,
                    tag_id,
                    content,
                    isPublished,
                    url,
                    coudinaryId,
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
    editPostWithFile: async(post_id,title,tag_id,content,isPublished,url,coudinaryId,userId) => {
        const parsedPostId = parseInt(post_id);
        const parsedUserId = parseInt(userId);
        if(isPublished==="true") isPublished=true
        else isPublished=false
        try {
            const editedPost = await prisma.post.update({
                where: {
                    post_id: parsedPostId,
                    author_id: parsedUserId
                },
                data: {
                    title,
                    tag_id,
                    content,
                    isPublished,
                    url,
                    coudinaryId
                }
            })
            return editedPost
        } catch (error) {
            console.error('ERROR UPDATING POST: ',error)
            throw error
        }
    },
    editPostWithOutFile: async(post_id,title,tag_id,content,isPublished,userId) => {
        const parsedPostId = parseInt(post_id);
        const parsedUserId = parseInt(userId);
        if(isPublished==="true") isPublished=true
        else isPublished=false
        try {
            const editedPost = await prisma.post.update({
                where: {
                    post_id: parsedPostId,
                    author_id: parsedUserId
                },
                data: {
                    title,
                    tag_id,
                    content,
                    isPublished,
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