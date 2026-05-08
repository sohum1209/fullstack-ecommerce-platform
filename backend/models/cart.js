const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",   // tells mongoose which collection to populate from
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,           // quantity can never go below 1
  },
}, { _id: false });   // no separate _id for each item — not needed


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,     // one cart per user — enforced at DB level
  },
  items: [cartItemSchema],
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);