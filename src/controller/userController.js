const userModel= require("../model/userModel")

const valid= require("../validations/validations")
const jwt=require("jsonwebtoken")

const Creation = async (req, res) => {

    try {
        let requestBody = req.body

              const {userName, email, password, mobile,adhaar,pan,address} = requestBody
   
           if (!valid.isValidRequestBody(requestBody)) {
             return  res.status(400).send({ status: false, msg: " Pls Provide RequestBody" })
           }
             
           if(!valid.isValid(userName)){
              return  res.status(400).send({ status: false, msg:"pls provide userName" })
           }
         
           if (!valid.isValid(email)) {
               return  res.status(400).send({ status: false, msg: "email is Mandatory" })
           }
           if (!valid.isValidEmail(email)) { 
           
               return  res.status(400).send({ status: false, msg: "Invalid email address" })
           }
   
           const emailAlreadyUsed = await userModel.findOne({ email: email })
           if (emailAlreadyUsed) {
               return res.status(400).send({ status: false, msg: " email id already used" })
           }
           
           if (!valid.isValid(password)) {
               return res.status(400).send({ status: false, msg: " pls provide password" })
           }
           if (!valid.validPass(password)) {
            return res.status(400).send({ status: false, msg: " pls provide valid password min 8 " })
        }
     
        if (!mobile) {
            return res.status(400).send({ status: false, msg: "phone no is Mandatory" })
        }
       
        if (!valid.validateMobile(mobile)) {
            return res.status(400).send({ status: false, msg: "pls provide correct phone " })
        }

        const usedPhone = await userModel.findOne({ mobile })
        if (usedPhone) {
            return res.status(400).send({ status: false, msg: " Phone is already register" })
        }
        
        if (!adhaar) {
            return res.status(400).send({ status: false, msg: "adhaar  no is Mandatory" })
        } 
        if (!valid.validAdhaar(adhaar)) {
            return res.status(400).send({ status: false, msg: "pls provide correct adhaar no " })
        }
        const usedAdhaar = await userModel.findOne({ adhaar })
        if (usedAdhaar) {
            return res.status(400).send({ status: false, msg: " adhaar no is already register" })
        }
        if (!pan) {
            return res.status(400).send({ status: false, msg: "pan  no is Mandatory" })
        } 
        if (!valid.validPan(pan)) {
            return res.status(400).send({ status: false, msg: "pls provide correct pan no " })
        }
        const usedPan = await userModel.findOne({ pan })
        if (usedPan) {
            return res.status(400).send({ status: false, msg: " pan no is already register" })
        }

        if (!address) {
            return res.status(400).send({ status: false, msg: "address is Mandatory" })
        }
        if (!valid.isValidStreet(address.street)) {
            return res.status(400).send({ status: false, msg: " invalid  street name " })
        }
        if (!valid.isValid(address.city)) {
            return res.status(400).send({ status: false, msg: " invalid city name " })
        }
        if (!valid.validPin(address.pin)) {
            return res.status(400).send({ status: false, msg: " invalid  pincode " })
        }
       
        const createUser = await userModel.create(requestBody)
        return res.status(201).send({ status: true, msg: " user created successfully", data: createUser })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }

}



   const userLogin =async (req,res)=>{


    try{
         
         let requestBody=req.body
         let {email,password}=requestBody
       
         if(!valid.isValidRequestBody(requestBody)){
            return res.status(400).send({ status: false, msg: "  request body can't be Empty" })
         }
       if(!email){
        return res.status(400).send({ status: false, msg: " email can't be Empty" })
       }
       if(!valid.isValidEmail(email)){
        return res.status(400).send({ status: false, msg: "Pls provide valid email" })
       }
       if(!password){
        return res.status(400).send({ status: false, msg: "password can't be Empty" })
       }
       if(!valid.validPass(password)){
        return res.status(400).send({ status: false, msg: "Pls provide valid password" })
       }
       if(email && password){
        let checkAvailability = await userModel.findOne({email:email,password:password})
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




   const getUsers = async function(req,res){

    try{
          
          const userData = await userModel.find()
  return res.status(200).send({status:true,msg:"All users details",data:userData})

    }catch(err){
        return res.status(500).send({ status: false, msg: err.msg })
   
    }
   }


   const getUserById= async function(req,res){
    try{

        const userID= req.params.userId
        if(!valid.isValid(userID)){
            return res.status(400).send({status:false,msg:"pls provide UserId"})
        }
        if(!valid.validObjId(userID)){
            return res.status(400).send({status:false,msg:"pls provide valid UserId"})
        }

        const userDetails = await userModel.findOne({_id:userID})
      
        if(!userDetails){
            return res.status(404).send({status:false,msg:"userID does not exists"})
        }
        return res.status(200).send({status:true,msg:" userData fetched successfully", data:userDetails})


    }catch(err){
        return res.status(500).send({ status: false, msg: err.msg })
   
    }
   }


   const updateUser = async function (req,res){
    try{

        const  userReq =req.params.userId

if(!valid.validObjId(userReq)){
    return res.status(400).send({status:false,msg:"pls provide valid UserId"})

}

const requestBody = req.body
  
        if (!valid.isValid(requestBody)) {
            return res.status(400).send({ status: false, msg: " Pls Provide requestBody" })
        }
        const { userName,email,password,mobile,adhaar,pan,address } = requestBody

        let savedData = await userModel.findOneAndUpdate({ _id: userReq }, {
            $set: { userName:userName,email:email,password:password,mobile:mobile,adhaar:adhaar,pan:pan,address:address},
           
        }, { new: true })

        res.status(200).send({ status: true, msg: "user details updated successfully", data: savedData })


    }


    catch(err){
        return res.status(500).send({ status: false, msg: err.msg })
    }
   }

   const userDeletionById = async function (req, res) {
    try {
        let user = req.params.userId


        if (!valid.validObjId(user)) {
            return res.status(400).send({ status: false, msg: " Pls provide Valid userId" })
        }
            const findingUser = await userModel.findOneAndUpdate({ _id: user }, { $set: { isDeleted: true, deletedAt: Date.now() }} )
            res.status(200).send({ status: true, msg: "user is Deleted successfully " ,data:findingUser})
    
        if (!findingUser){
            return res.status(404).send({status:false,msg:"user doesnt exists"})
        }

    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}
   


   module.exports ={Creation,userLogin,getUsers,getUserById,updateUser,userDeletionById, }