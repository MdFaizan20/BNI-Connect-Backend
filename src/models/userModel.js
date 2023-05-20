const mongoose = require("mongoose")

const userschema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    userId:{
        type:Number,
        required:true,
       unique:true
    },
password:{
    type:String,
    required:true,
    min:8
},
emailId:{
    type:String,
    required:true,
    lowercase:true,
    unique:true
},
userName:{
    type:String,
    required:true,
 unique:true
},
gender:{
    type:String,
    required:true,
    enum:["Male","Female","Other"]
},
mobile:{
    type:Number,
    required:true
},
profile:{
    type:String,
    required:true,
    enum:["public","private"],
    default:"public"
}

},{timestamps:true})



module.exports=mongoose.model("userStorage",userschema)