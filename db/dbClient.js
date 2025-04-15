const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

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