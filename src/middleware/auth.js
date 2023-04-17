const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")
const valid = require("../validations/validations")

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status: false, msg: " Token Required" })

        jwt.verify(token, "secret", function (err, decodedToken) {
            if (err) {
                return res.status(400).send({ status: false, msg: "Invalid Token or Token Expired" });
            } 
              req.decodedToken = decodedToken
                next() 
        })
        
        
    } catch (err) {
       
        res.status(500).send({ status: false, msg: err.message })
    }
}


const authorization = async (req, res, next) => {
    try {
        
            let token = req.headers["x-api-key"];
            let decodedToken = jwt.verify(token, "secret")
    
            let userId = req.params.userId
            
            if (userId) {
    
              await userModel.find({ _id: userId }).select({ userId: 1, _id: 0 })
 
            
             
                let id = decodedToken.userId
                if (id != userId) return res.status(403).send({ status: false, msg: "Not Authorized !!" })
            }
            else {
                let userID = req.body.userId
                if (!valid.validObjId(userID)) {
                    return res.status(400).send({ status: false, msg: "invalid userId" })
                }
                let ID = decodedToken.userId
                
    
                if (ID!= userID) return res.status(403).send({ status: false, msg: "Not Authorized !!" })
            }
    
            next();
    }    

    catch (err) {
        res.status(500).send({ status: false, error: err.message }) 
    }

}


module.exports={authentication,authorization}
