const express = require('express');
const PromoCode = require("../schemas/promoCode");
const jwt = require("jsonwebtoken");
const {findOne} = require("../schemas/customer");
const Customer = require("../schemas/customer");

const customerRoute = express.Router();
const jwtKey = 'fdsfdsfdsfd23423fdsf./dsf.d/fdsfdsfds'

const decodeJwt = (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return  token
}


customerRoute.post('/active-promo',async (req, res) => {
    const token = decodeJwt(req, res)

    try {
        const decoded = jwt.verify(token, jwtKey);

        const promoCode = await PromoCode.findOne({hash: req.body.promoCode});
        const customer = await Customer.findOne({email:decoded.email});

        customer.balance += promoCode.price

        await customer.save()
        return res.json({
            status: true,
            data: 'Successfully'
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
})


module.exports = customerRoute
