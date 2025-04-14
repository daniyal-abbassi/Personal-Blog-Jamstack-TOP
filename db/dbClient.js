const {prismaClient} = require('@prisma/client');
const prisma = new prismaClient();

const dbClient = {
    createUser: async(username,password) => {
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
    }
}



module.exports=dbClient;