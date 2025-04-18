const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dbClient = require('../db/dbClient');



const loginController = {
    loginPost: async(req,res)=>{
        try {
            const {username,password} = req.body;
            const existingUser = await dbClient.searchUser(username);
            if(!existingUser) {
                res.status(401).send('User Not exists!!!')
            } else {
                const matchPass = await bcrypt.compare(password,existingUser.password);
                if(matchPass) {
                    const payload = {userId: existingUser.user_id,username: existingUser.username}
                   const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '1d'})
                   res.cookie('token', token, { httpOnly: false });
                   res.json({ token });
                   //console.log the user to test 
                   console.log('user is: ',existingUser)
                } else {
                    res.status(401).send('Invalid credentials')
                }
            }
        } catch (error) {
            console.error('Server error!',error);
            res.status(500).send('Server error log-in',error);
        }
    }
}



module.exports=loginController;