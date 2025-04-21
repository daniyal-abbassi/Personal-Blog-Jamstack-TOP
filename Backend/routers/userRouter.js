const {Router} = require('express');
const userRouter = Router();


userRouter.get('/',async (req,res)=>{
    try {
        console.log('this is from api/user',req.json)
    } catch (error) {
        console.error('Error getting user data: ',error);
        throw new Error('Error getting user data')
    }
})

module.exports=userRouter;