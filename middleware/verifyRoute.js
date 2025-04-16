//verify toke and pass it to req object
const jwt = require('jsonwebtoken');


function verifyToken(req,res,next) {
    const token = req.cookies.token;
    
       if(token) {
           jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
               if(err) {
                   return res.status(401).json({ message: 'Invalid token' });
               };
               req.user = user;
               next();
           })
   
       } else {
           return res.status(401).json({ message: 'No token provided' });
       }
}

module.exports=verifyToken;