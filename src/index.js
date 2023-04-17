const express = require("express");
const mongoose = require("mongoose");
const route = require("./route/routes");
const app = express()

app.use(express.json());  

 mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://aliabbasbackendcohort:AMMIabbu321@cluster67.6fp98uh.mongodb.net/group5Databse?retryWrites=true&w=majority",{
    useNewUrlParser:true  
}) 

.then(()=> console.log("MongoDB  connected successfully"))  
.catch(err => console.log(err))


app.use("/",route) 

app.use( (req ,res) => {
    res.status(400).send({status : false , message :`Page Not Found , Given URL ${req.url} is incorrect for this application.`})
})

app.listen(process.env.PORT || 3000, function(){
    console.log("express app runing on port "+(process.env.PORT || 3000) )
})