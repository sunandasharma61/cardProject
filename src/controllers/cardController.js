const cardModel = require("../models/cardModel")
const customerMoodel = require("../models/customerModel")

const { isValidCardNumber, isValidString } = require("../valid/validation")


//==========Create card===========

const createCard = async function (req, res) {
    try {
        let data = req.body

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Card data is required " })
        }
        if (!isValidCardNumber(data.cardNumber)) return res.status(400).send({ status: true, msg: "Provide valid card number" })
        let presentcart = await cardModel.findOne({ cardNumber: data.cardNumber, status: "ACTIVE" })
        if (presentcart) return res.status(400).send({ status: false, msg: "This card no already exist" })


        if (data.cardType !== "REGULAR" || data.cardType == "SPECIAL") {
            return res.status(400).send({ status: false, msg: "Provide valid cardType info between REGULAR & SPECIAL" })
        }

        if (!isValidString(data.customerName)) return res.status(400).send({ status: false, msg: "Provide valid customerName" })
        if (data.status) {
            if (data.status !== "ACTIVE" || data.status == "INACTIVE") {
                return res.status(400).send({ status: false, msg: "Provide valid status info" })
            }
        }


        const cardCreation = await cardModel.create(data)
        return res.status(201).send({ status: true, data: cardCreation })
    }
    catch (error) {
        return res.status(500).send({ status: true, msg: error.message })
    }
}

//==============Get Card============

const getCardDetails = async function (req, res) {
    try {

        const fetchData = await cardModel.find({ status: "ACTIVE" }).populate("customerID")
        return res.status(200).send({ status: true, Data: fetchData })

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports = { createCard, getCardDetails }