const mongoose=require("mongoose")


const validRequestbody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidName = (value) => {
    const regex =/^[a-zA-Z ]+(([',. -][a-zA-Z ])?[a-zA-Z ])$/.test(value)
    return regex
}

let lastUserID = "user001";

function generateNextUserID() {
  const regex = /(\d+)/;
  const match = regex.exec(lastUserID);
  const nextUserID = parseInt(match[1]) + 1;
  const paddedUserID = nextUserID.toString().padStart(match[1].length, '0');
  lastUserID = `user${paddedUserID}`;
  return lastUserID;
}

function validPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
  
  const validEmail = (emailId) => {
    const regex = /^([a-zA-Z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/.test(emailId)
    return regex
}

const validGender = function(gender) {
    return [["Male","Female","Other"]].indexOf(gender) !== -1
  }
  
  function validateMobileNumber(mobile) {
    const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return regex.test(mobile);
  }

  const validProfile = function(profile) {
    return [["public","private"]].indexOf(profile) !== -1
  }
  
module.exports = {   validRequestbody,isValidName,generateNextUserID,validPassword,validEmail,validGender,validateMobileNumber,validProfile}