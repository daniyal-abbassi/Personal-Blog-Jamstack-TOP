const express = require('express');
require('dotenv').config();
const app = express();






app.get('/',(req,res)=>res.send('express workking fine'))

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>console.log(`SERVER is running on port ${PORT}`))