const fs = require("fs");
const mongoose = require("mongoose");
const model = require("../model/product");

const Product = model.Product;
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const output = await product.save();
    console.log(output);
    res.status(201).json(output);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
exports.GetOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const products = await Product.findById(id);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndDelete({ _id: id });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
