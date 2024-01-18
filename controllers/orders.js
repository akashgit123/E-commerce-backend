const ordersModel = require("../models/orders");

const getUserOrders = async (req, res) => {
  try {
    const orders = await ordersModel
      .find({ buyer: req.user._id })
      .populate("products", "-image")
      .populate("buyer", "name")
      .sort({ createAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Your Orders",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Get Orders",
      error,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await ordersModel
      .find({})
      .populate("products", "-image")
      .populate("buyer", "name")
      .sort({ createAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All Orders",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Get All Orders",
      error,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orderUpdate = await ordersModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Updated the Status",
      orderUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to  Update Status",
      error,
    });
  }
};

module.exports = { getUserOrders, getAllOrders, updateOrderStatus };
