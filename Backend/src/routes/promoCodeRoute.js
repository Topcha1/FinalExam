const express = require('express');
const PromoCode = require("../schemas/promoCode");

const promoCodeRoute = express.Router();


promoCodeRoute.get('/all',async (req, res) => {
    try {
        const promoCode = await PromoCode.find();

        if (!promoCode) {
            return res.json({
                status: true,
                data: 'Not Found'
            });
        }

        return res.json({
            status: true,
            data: promoCode
        });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
})

promoCodeRoute.post('/create',async (req, res) => {
    try {
        const newPromoCode = new PromoCode({
            ...req.body,
            createdAt: new Date()
        });

        newPromoCode.save();
        return res.json({
            status: true,
            data: 'Successfully'
        });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
})

promoCodeRoute.delete('/delete',async (req, res) => {
    try {
        const promoCode = await PromoCode.findOne({hash: req.body.hash});

        if(!promoCode) {
            return res.json({
                status: true,
                data: 'Not Found'
            });
        }

        await promoCode.deleteOne()

        return res.json({
            status: true,
            data: 'Successfully'
        });
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
})

module.exports = promoCodeRoute
