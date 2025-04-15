const dbClient = require('../db/dbClient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const signUpController = {
    signUpPost: async(req,res)=>{
        try {
            const {username,password} = req.body;
            const existingUser = await dbClient.searchUser(username);
            if(existingUser) {
                res.status(400).send('User already exists!!!')
            } else {
                const hashedPass = await bcrypt.hash(password,10);
                const user = await dbClient.createUser(username,hashedPass);
                const payload = {userId: user.user_id,username: user.username}
               jwt.sign(payload,process.env.JWT_SECRET,(err,token)=>{
                res.json({token})
               })
               //console.log the user to test 
               console.log('user is: ',user)
            }

        } catch (error) {
            console.error('Server error during signup:', error)
            res.status(500).send('Server error during user creation.')
        }
    }
}



module.exports=signUpController;