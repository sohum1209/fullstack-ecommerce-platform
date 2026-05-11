const Order = require("../models/order");
const Cart = require("../models/cart");

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, subtotal, shipping = 0, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    const order = await Order.create({
      userId: req.user.id,
      items,
      shippingAddress,
      subtotal,
      shipping,
      total,
      paymentMethod: "Cash on Delivery",
    });

    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create order",
      error: err.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
};

module.exports = { createOrder, getOrders };
