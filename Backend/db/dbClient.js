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

    createPost: async(title,content,published,author_id) => {
        try {
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    published,
                    author_id
                }
            })
            return post;
        } catch (error) {
            console.error('ERROR CREATING POST: ',error)
            throw error
        }
    }
}



module.exports = dbClient;