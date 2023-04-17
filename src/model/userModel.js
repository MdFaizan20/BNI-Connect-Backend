const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName :{

    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    min:8
  },
  mobile:{
    type:Number,
    required:true,
    unique:true
  },
  adhaar:{
    type:String,
    required:true,
    unique:true
  },
pan:{
  type:String,
  required:true,
  unique:true
},
address: {
  street: { 
      type: String, 
      required: true, 
      trim: true
   },
  city: {
       type: String,
        required: true,
         trim: true
       },
  pin: {
       type: Number,
       required: true
         }
}
 
},{timestamps:true});

module.exports  = mongoose.model('BNIDB', userSchema);

