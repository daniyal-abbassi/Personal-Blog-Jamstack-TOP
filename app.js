const express = require('express');
require('dotenv').config();
const dbClient = require('./db/dbClient');
const app = express();
const signupRouter = require('./routers/signUpRouter')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.set('view engine','ejs')




app.get('/',(req,res)=>res.send('express workking fine'))
app.use('/api/sign-up',signupRouter)
const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>console.log(`SERVER is running on port ${PORT}`))