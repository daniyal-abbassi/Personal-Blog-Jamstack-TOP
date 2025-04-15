const dbClient = require('../db/dbClient');
const jwt = require('jsonwebtoken');


const signUpController = {
    signUpPost: async(req,res)=>{
        try {
            const {username,password} = req.body;
            const existingUser = await dbClient.searchUser(username);
            if(existingUser) {
                res.status(400).send('User already exists!!!')
            } else {
                const user = await dbClient.createUser(username,password);
               jwt.sign({user},'secretkey',(err,token)=>{
                res.json({token})
               }) 
               console.log('user is: ',user)
            }

        } catch (error) {
            console.error('server error: ',error)
            res.status(500).send('server error, creating user: ',error)
        }
    }
}



module.exports=signUpController;