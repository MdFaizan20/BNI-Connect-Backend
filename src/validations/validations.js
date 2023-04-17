const mongoose= require("mongoose")

const validObjId =function(Id){
    return mongoose.Types.ObjectId.isValid(Id)
}


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const validPass =  function (password) {
    const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
    return passwordRegex.test(password);
  };
const validAdhaar =  function (adhaar) {
    const adhaarRegex = /^\d{4}\s\d{4}\s\d{4}$/;
    return adhaarRegex.test(adhaar);
  };

const validPan =  function (pan) {
    const panRegex =  /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateMobile = function (mobile) {
    var re = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (typeof (mobile) == 'string') {
        return re.test(mobile.trim())
    } else {
        return re.test(mobile)
    }
};

const isValidStreet = function (street){
    let re = /^.*?\s[N]{0,1}([-a-zA-Z0-9]+)\s*\w*$/

    return re.test(street)

}
const validPin = function(pin){
    let re =/^[0-9]{6,6}$/
    return re.test(pin)
}



module.exports={validObjId,isValidRequestBody,isValid,isValidEmail,validPass,validAdhaar,validPan,validateMobile,isValidStreet ,validPin}