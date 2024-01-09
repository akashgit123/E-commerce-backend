const { validationResult } = require("express-validator");
const CategoryModel = require("../models/category");
const slugify = require("slugify");

const createCategory = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(401).json({ message: result.array()[0] });
  }
  try {
    const { name } = req.body;
    const categoryExists = await CategoryModel.findOne({ name });
    if (categoryExists) {
      return res.status(200).json({
        success: false,
        message: "Categroy already exists",
      });
    }
    const newCatogory = await CategoryModel.create({
      name,
      slug: slugify(name),
    });
    return res.status(201).json({
      success: true,
      message: "New Categroy Added Successfully",
      newCatogory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Add Category",
      error,
    });
  }
};

const updateCategory = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(401).json({ message: result.array()[0] });
  }
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "Categroy Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Update Category",
      error,
    });
  }
};

const allCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    return res.status(201).json({
      success: true,
      message: "All Categories",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to Fetch all Category",
      error,
    });
  }
};

const findCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await CategoryModel.findOne({ slug });
    return res.status(201).json({
      success: true,
      message: "Fetched Selected Category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Find the Category",
      error,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    return res.status(201).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Delete Category",
      error,
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  allCategory,
  findCategory,
  deleteCategory,
};
