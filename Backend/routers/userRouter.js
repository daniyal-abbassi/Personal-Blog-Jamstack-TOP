const {Router} = require('express');
const userRouter = Router();
const jwt = require('jsonwebtoken');
const dbClient = require('../db/dbClient');

userRouter.get('/',async (req,res)=>{
    try {
        //GET THE TOKEN FROM REQ.TOKEN
        const token = req.cookies.token;
        console.log('this is from api/user',token)
        if(!token) {
            return res.status(402).json({message: 'AUTHENTICATION REQUIRED - NO TOKEN '})
        }
        //VERIGY TOKEN WITH JWT
        jwt.verify(token,process.env.JWT_SECRET,async(err,decoded) => {
            if(err) {
                console.log('Token verification faild: ',err);
                return res.status(403).json({message: 'Authentication failed - invalid credentials'})
            }
            //DECODE USERID FROM JWT
            const userId = decoded.userId;
            console.log('Decoded User Id: ',userId)
            //GET USER INFORMATION WITH ID
            const user = await dbClient.searchUserById(userId)
            if(!user) {
                return res.status(403).json({message: 'User not Found!'})
            }
            //SEND USER DATA BACK TO FRONTEND
            res.json(user)
        })


    } catch (error) {
        console.error('Error getting user data: ',error);
        res.status(500).json({message: 'Error getting user data'})
    }
})

module.exports=userRouter;