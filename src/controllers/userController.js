const userModel =require("../models/userModel")


const registration = async function(req,res){

try{

  const requestBody = req.body

  const { name,userId,password, emailId,userName,gender,mobile,profile} = requestBody
  


 await userModel.create(requestBody)
 return res.status(201).send({status:true,msg:"created succcessfully",data:requestBody})


}
catch(err){

return res.status(500).send({status:false,msg:err.msg})

}



}
module.exports= { registration}