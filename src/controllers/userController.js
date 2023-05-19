const userModel =require("../models/userModel")
 const valid= require("../validation/validators")

const registration = async function(req,res){

try{

const requestBody= req.body

//   const { name,userId,password, emailId,userName,gender,mobile,profile} = requestBody
  
// if(!valid.validRequestbody(requestBody)){
//   return res.status(400).send({status:false,msg:"request body can't be empty"})
// }
// if(!name){
//   return res.status(400).send({status:false,msg:"Please provide name of the user"})
// }
// if (!valid.isValidName(name)) {
//   return res.status(400).send({ status: false, message: "Please provide correct  Name " })
// }
// // if(!userId){
// // if(valid.generateNextUserID(userId)){

// // }}
// if(!password){
//   return res.status(400).send({status:false,msg:"Please provide password "})
// }
// if (!valid.validPassword(password)) {
//   return res.status(400).send({ status: false, message: "Please provide   password in formatt of " })
// }

// if (!emailId) {
//   return res.status(400).send({ status: false, message: "Email is required!" });
// }
// if (!valid.validEmail(emailId)) {
//   return res.status(400).send({ status: false, message: "Invalid email id" })

// }
// let userEmail = await userModel.findOne({ emailId: emailId });
// if (userEmail)
//   return res.status(401).send({ status: false, message: "This email address already exists, please enter a unique email address!" });

    
// if(!gender){
//   return res.status(400).send({ status: false, message: "gender of user required!" });
// }
// if (gender) {
//   if (!validGender(gender)) {
//       return res.status(400).send({ status: false, message: `Status must be among ['pending','completed','cancelled'].`,
//       });
//     }}
//   if(!userName){
//     return res.status(400).send({status:false,msg:"Please provide userName "})
//   }
//   let userNameUsed = await userModel.findOne({ userName: userName });
  
//   if (userNameUsed){
//   return res.status(401).send({ status: false, message: "This user name already exists, please enter a unique user name!" });
  
//     }



// if (!mobile) {
//   return res.status(400).send({ status: false, message: "mobile number is required!" });
// }
// if (!valid.validateMobileNumber(mobile)) {
//   return res.status(400).send({ status: false, message: "pls provide correct mobile number " })
// }
// let userNumber = await userModel.findOne({ mobile: mobile });
// if (userNumber)
//   return res.status(409).send({ status: false, message: "This phone number already exists, please enter a unique mobile number!" });

//   if (profile) {
//     if (!validProfile(profile)) {
//         return res.status(400).send({ status: false, message: `Status must be among ['public','private'].`,
//         });
//     }
// }
console.log(requestBody)
 let userDetails= await userModel.create(requestBody)
 
 return res.status(201).send({status:true,msg:"created succcessfully",data:userDetails})
  

}
catch(err){

return res.status(500).send({status:false,msg:err.msg})

}


  
}
module.exports= { registration}