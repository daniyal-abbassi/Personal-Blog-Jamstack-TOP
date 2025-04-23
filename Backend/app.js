const express = require('express');
require('dotenv').config();
const dbClient = require('./db/dbClient');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const signupRouter = require('./routers/signUpRouter')
const loginRouter = require('./routers/loginRouter');
const postsRouter = require('./routers/postsRouter');
const userRouter = require('./routers/userRouter');

app.use(cookieParser())

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:5174'],
    credentials: true
}
app.use(cors(corsOptions))

app.get('/',(req,res)=>res.send('express workking fine'))
app.use('/api/sign-up',signupRouter)
app.use('/api/log-in',loginRouter)
app.use('/api/posts',postsRouter)
app.use('/api/user',userRouter)

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>console.log(`SERVER is running on port ${PORT}`))