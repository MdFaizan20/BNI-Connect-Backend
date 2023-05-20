const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const valid= require("../validation/validators")
const registration = async (req,res)=>{


  try{

    const requestBody =req.body


      let { name  ,password, emailId,userName,gender,mobile,profile} = requestBody
  
if(!valid.validRequestbody(requestBody)){
  return res.status(400).send({status:false,msg:"request body can't be empty"})
}
if(!name){
  return res.status(400).send({status:false,msg:"Please provide name of the user"})
}
if (!valid.isValidName(name)) {
  return res.status(400).send({ status: false, message: "Please provide correct  Name " })
}


if(!password){
  return res.status(400).send({status:false,msg:"Please provide password "})
}
if (!valid.validPassword(password)) {
  return res.status(400).send({ status: false, message: "Please provide   password in formatt of " })
}

if (!emailId) {
  return res.status(400).send({ status: false, message: "Email is required!" });
}
if (!valid.validEmail(emailId)) {
  return res.status(400).send({ status: false, message: "Invalid email id" })

}
let userEmail = await userModel.findOne({ emailId: emailId });
if (userEmail)
  return res.status(400).send({ status: false, message: "This email address already exists, please enter a unique email address!" });

    
if(!gender){
  return res.status(400).send({ status: false, message: "gender of user required!" });
}
if (gender) {
  if (!valid.validGender(gender)) {
      return res.status(400).send({ status: false, message: `Gender must be among ['Male','Female','Other'].`,
      });
    }}
  if(!userName){
    return res.status(400).send({status:false,msg:"Please provide userName "})
  }
  let userNameUsed = await userModel.findOne({ userName: userName });
  
  if (userNameUsed){
  return res.status(400).send({ status: false, message: "This user name already exists, please enter a unique user name!" });
  
    }



if (!mobile) {
  return res.status(400).send({ status: false, message: "mobile number is required!" });
}
if (!valid.validateMobileNumber(mobile)) {
  return res.status(400).send({ status: false, message: "pls provide correct mobile number " })
}
let userNumber = await userModel.findOne({ mobile: mobile });
if (userNumber)
  return res.status(400).send({ status: false, message: "This phone number already exists, please enter a unique mobile number!" });

  if (profile) {
    if (!valid.validProfile(profile)) {
        return res.status(400).send({ status: false, message: `Status must be among ['public','private'].`,
        });
    }
}
const newUser = {
  userId:await userModel.countDocuments() + 1,
  name,
  password,
  emailId,
  userName,
  gender,
  mobile,
  profile
};
    const userDetails =await userModel.create(newUser)
    return res.status(201).send({status:true,msg:"Data created successfully",Data:userDetails})


  }catch(err){
    return res.status(500).send({status:false,msg:err.message})
  }

}



const userLogin =async (req,res)=>{


  try{
       
       let requestBody=req.body
       let {emailId,password}=requestBody
     
       if(!valid.validRequestbody(requestBody)){
          return res.status(400).send({ status: false, msg: "  request body can't be Empty" })
       }
     if(!emailId || !password){
      return res.status(400).send({ status: false, msg: " emailId and password are mandatory" })
     }
     if(!valid.validEmail(emailId)){
      return res.status(400).send({ status: false, msg: "Pls provide valid emailId" })
     }
     
     if(!valid.validPassword(password)){
      return res.status(400).send({ status: false, msg: "Pls provide valid password" })
     }
     if(emailId && password){
      let checkAvailability = await userModel.findOne({emailId:emailId,password:password})
      if(checkAvailability){
          const payload = { "userId":checkAvailability['_id'].toString(), 
          'exp': Math.floor(Date.now() / 1000) + (60 * 60 * 5), 
          "iat": Math.floor(Date.now() / 1000)
       }
          const jwtToken = jwt.sign(payload, 'secret')

          let obj = {userId:payload.userId,
              iat:payload.iat,exp:payload.exp,
              token:jwtToken}

          return res.status(200).send({status:true,data:obj})
      }else{
          return res.status(401).send({status:false,msg:"Invalid credentials"})
      }
     }

  }  
  catch(err){
      return res.status(500).send({status:false,msg:err.message})
  }
  
  
  }

module.exports={registration,userLogin}