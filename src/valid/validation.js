const mongoose= require("mongoose");
const moment= require("moment");


//=============validations=========
const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isValidEmail = function(value){
      let regex=/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
      return  regex.test(value)
}

const isValidPhone = (Mobile) => {
    return /^[6-9]\d{9}$/.test(Mobile)
  }

const isValidString = (String) => {
    const regexName=/^[a-zA-Z ]+$/;
    return regexName.test(String)
  }

  const isValidDate = function (date) {
    if (typeof date != "string") return false
    return moment(date, 'YYYY-MM-DD', true).isValid()
  }

  let isValidCardNumber= function(value){
    const regex=/(?:\d[ -]*?){13,16}/
    return regex.test(value)
  }
  module.exports={isValidObjectId,isValidPhone,isValidDate,isValidEmail,isValidString,isValidCardNumber}