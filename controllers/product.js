const { validationResult } = require("express-validator");
const productModel = require("../models/product");
const slugify = require("slugify");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const { name } = req.fields;
    const { image } = req.files;
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }
    await product.save();
    return res.status(201).json({
      success: true,
      message: "New Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Add Product",
      error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.fields;
    const { image } = req.files;
    const product = await productModel.findByIdAndUpdate(
      id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }
    await product.save();
    return res.status(201).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Update Product",
      error,
    });
  }
};

const allProducts = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-image")
      .limit(15)
      .sort({ createdAt: -1 });
    return res.status(201).json({
      success: true,
      message: "All Products",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Fetch Products",
      error,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel
      .findOne({ slug })
      .select("-image")
      .populate("category");
    return res.status(201).json({
      success: true,
      message: "Product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Fetch Products",
      error,
    });
  }
};

const getProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id).select("image");
    if (product.image.data) {
      res.set("Content-type", product.image.contentType);
      return res.status(201).send(product.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Fetch Image",
      error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    return res.status(201).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Delete Product",
      error,
    });
  }
};

const productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    return res.status(200).json({
      success: true,
      message: "Filtered Product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Filter Product",
      error,
    });
  }
};

module.exports = {
  createProduct,
  allProducts,
  getProduct,
  getProductImage,
  deleteProduct,
  updateProduct,
  productFilter,
};
