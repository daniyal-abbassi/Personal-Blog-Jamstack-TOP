const express = require('express');
require('dotenv').config();
const dbClient = require('./db/dbClient');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const signupRouter = require('./routers/signUpRouter')
const loginRouter = require('./routers/loginRouter');
const postsRouter = require('./routers/postsRouter');


app.use(cookieParser())

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine','ejs')

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))

app.get('/',(req,res)=>res.send('express workking fine'))
app.use('/api/sign-up',signupRouter)
app.use('/api/log-in',loginRouter)
app.use('/api/posts',postsRouter)


const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>console.log(`SERVER is running on port ${PORT}`))