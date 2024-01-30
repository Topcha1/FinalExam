const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const promoCodeSchema = new Schema({
    title: String,
    hash: String,
    price: Number,
    createdAt: Date
});

const PromoCode = mongoose.model('promoCode', promoCodeSchema);

module.exports = PromoCode;
