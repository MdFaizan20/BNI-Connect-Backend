const jwt = require("jsonwebtoken")



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

module.exports={authentication}