const express = require('express');
const Customer = require("../schemas/customer");
const {genSalt, hash, compare} = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

const jwtKey = 'fdsfdsfdsfd23423fdsf./dsf.d/fdsfdsfds'

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, jwtKey, {
    expiresIn: '4h',
  });
};

const decodeJwt = (req, res) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return  token
}


authRouter.get('/information', async (req, res) => {

  const token = decodeJwt(req,res)

  try {
    const decoded = jwt.verify(token, jwtKey);

    const customer = await Customer.findOne({email: decoded.email})

    res.status(200).json({
      status: true,
      data: {
        firstName: customer.firstName,
        balance: customer.balance,
        lastName: customer.lastName,
        email: customer.email,
      }
    });

  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

authRouter.post('/register', async (req, res) => {
  try {
    const customer = await Customer.findOne({email: req.body.email})

    if(customer) {
     return res.json({
       status: false,
       data: 'Email already exist'
     })
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(req.body.password, salt);

    const newCustomer = new Customer({
      ...req.body,
      balance: 0,
      password: hashedPassword
    });

   const savedCustomer =  await newCustomer.save();

    const token = generateToken(savedCustomer);
    return res.json({
      status: true,
      data: token
    });
  } catch (error) {
   return res.status(400).json({message: error.message});
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({email})

    if(!customer) {
      return res.json({
        status: false,
        data: 'Invalid email or password'
      })
    }

    const isPasswordValid = await compare(password, customer.password);

    if (isPasswordValid) {
      const token = generateToken(customer);
      return res.json({
        status: true,
        data: token
      });
    } else {
      return res.json({ message: 'Invalid username or password' });
    }

  } catch (error) {
    return res.status(400).json({message: error.message});
  }
});

authRouter.put('/update', async (req, res) => {
  const token = decodeJwt(req, res)

  try {
    const decoded = jwt.verify(token, jwtKey);

    const customer = await Customer.findOne({email: decoded.email})
    const {firstName, lastName, email} = req.body

    customer.firstName = firstName  || customer.firstName
    customer.lastName = lastName  || customer.lastName
    customer.email = email  || customer.email

    await customer.save()
    return res.json({
      status: true,
      data: 'Successfully'
    })

  } catch (error) {
    res.status(401).json({message: 'Unauthorized'});
  }
});

authRouter.post('/change', async (req, res) => {
  const token = decodeJwt(req, res)

  try {
    const decoded = jwt.verify(token, jwtKey);

    const customer = await Customer.findOne({email: decoded.email})

    const isPasswordValid = await compare(req.body.oldPassword, customer.password);

    if(!isPasswordValid) {
      return  res.json({
        status: false,
        data: 'Incorrect old password'
      })
    }

    const salt = await genSalt(10);
    customer.password = await hash(req.body.password, salt)

    await customer.save()
    return res.json({
      status: true,
      data: 'Successfully'
    })

  } catch (error) {
    res.status(401).json({message: error});
  }
});

module.exports = authRouter;
