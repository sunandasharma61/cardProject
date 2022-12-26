const cartmodel = require("../models/cardModel")
const customerModel = require("../models/customerModel")
const uuid = require("uuid")
const { isValidObjectId, isValidPhone, isValidDate, isValidEmail, isValidString } = require("../valid/validation")

//===============================CREATE CUSTOMER========================================================//

const createCustomer = async function (req, res) {
    try {

        let data = req.body

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Customer data required " })
        }

        let { firstName, lastName, mobileNumber, DOB, emailID, address } = data


        if (!firstName) return res.status(400).send({ status: false, message: "First name is mandatory" })
        if (!isValidString(firstName.trim())) return res.status(400).send({ status: false, message: "Not a valid first name " })

        if (!lastName) return res.status(400).send({ status: false, message: "Last name is mandatory" })
        if (!isValidString(lastName.trim())) return res.status(400).send({ status: false, message: "Not a valid last name" })

        if (!mobileNumber) return res.status(400).send({ status: false, message: "Mobile Number is mandatory" })
        if (!isValidPhone(mobileNumber)) return res.status(400).send({ status: false, msg: "Put a valid mobile number" })
        let findMobile = await customerModel.findOne({ mobileNumber: mobileNumber })
        if (findMobile) {
            return res.status(400).send({ status: false, message: "Mobile number already exists" })
        }

        if (!DOB) return res.status(400).send({ status: false, message: "DOB is mandatory" })
        if (!isValidDate(DOB)) return res.status(400).send({ status: false, message: "Please enter a valid DOB" })

        if (!emailID) return res.status(400).send({ status: false, message: "emailID is required" })
        if (!isValidEmail(emailID)) return res.status(400).send({ status: false, message: "emailID is not Valid" })
        const checkemailID = await customerModel.findOne({ emailID: emailID })
        if (checkemailID) return res.status(400).send({ status: false, message: "emailID already exist" })

        if (!address) return res.status(400).status({ status: false, message: "Please enter address" })

        const customerID = uuid.v4()
        data.customerID = customerID

        const customer = await customerModel.create(data)

        return res.status(201).send({ status: false, message: "Success", data: customer })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
//==========Get customer=============

const getCustomer = async function (req, res) {
    try {
        const customer = await customerModel.find({ status: "ACTIVE" })
        return res.status(200).send({ status: true, message: customer })
    }
    catch (err) {
        return res.status.send({ status: false, message: err.message })
    }
}

//==========Delete Customer==========

const deleteCustomer = async function (req, res) {
    try {
        let customerId = req.params.customerId
        if (!isValidObjectId(customerId)) { return res.status(400).send({ status: false, message: "Invalid customerId" }) }
        let findCustomer = await customerModel.findOne({ _id: customerId, status: "ACTIVE" })
        if (!findCustomer) { return res.status(404).send({ status: false, message: "Customer not found" }) }

        await customerModel.findOneAndUpdate({ _id: customerId }, { status: "INACTIVE" })
        await cartmodel.findOneAndUpdate({ customerID: customerId }, { status: "INACTIVE" })

        return res.status(200).send({ status: false, message: "Deleted Succesfully" })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { createCustomer, getCustomer, deleteCustomer }