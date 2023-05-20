const express = require('express');
const route = require('./routes/route')
const mongoose = require('mongoose')
const multer = require("multer")
const app = express();

app.use(express.json())
app.use(multer().any()) 
mongoose.connect("mongodb+srv://Mdfaizan:Faizan121@cluster0.vaxmuig.mongodb.net/socialMedia",{useNewUrlParser:true})

.then(()=>console.log("mongodb connected"))
.catch(err => console.log(err))

app.use('/',route)

 

app.listen(process.env.PORT || 3000,function(){
    console.log('express app running on port '+ (process.env.PORT || 3000))
})