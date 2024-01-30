const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  balance: Number,
  password: String,
});

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
