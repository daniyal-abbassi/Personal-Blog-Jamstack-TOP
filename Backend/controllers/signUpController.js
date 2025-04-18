const dbClient = require('../db/dbClient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const signUpController = {
    signUpPost: async (req, res) => {
        try {
            console.log('this is req.body: ',req.body)
            const { username, password } = req.body;
            const existingUser = await dbClient.searchUser(username);
            if (existingUser) {
                res.status(400).send('User already exists!!!')
            } else {
                const hashedPass = await bcrypt.hash(password, 10);
                const user = await dbClient.createUser(username, hashedPass);
                const payload = { userId: user.user_id, username: user.username }
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
                res.cookie('token', token, { httpOnly: false });
                res.json({ token })
                //console.log the user to test 
                console.log('user is: ', user)
            }

        } catch (error) {
            console.error('Server error during signup:', error)
            res.status(500).send('Server error during user creation.')
        }
    }
}



module.exports = signUpController;