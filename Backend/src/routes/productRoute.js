const express = require("express");
const Product = require("../schemas/product");

const productRoute = express.Router();

productRoute.get("/all", async (req, res) => {
  try {
    const product = await Product.find();

    if (!product) {
      return res.json({
        status: true,
        data: "Not Found",
      });
    }

    return res.json({
      status: true,
      data: product,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

productRoute.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });

    if (!products) {
      return res.json({
        status: true,
        data: "Not Found",
      });
    }

    return res.json({
      status: true,
      data: products,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

productRoute.get("/one/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const product = await Product.find({ _id: categoryId });

    if (!product) {
      return res.json({
        status: true,
        data: "Not Found",
      });
    }

    return res.json({
      status: true,
      data: product,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

productRoute.post("/add", async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      createdAt: new Date(),
    });

    await newProduct.save();

    return res.json({
      status: true,
      data: "Successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

productRoute.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.json({
        status: false,
        data: "Not Found",
      });
    }

    await product.deleteOne();

    return res.json({
      status: true,
      data: "Successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = productRoute;
