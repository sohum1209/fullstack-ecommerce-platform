const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        title: String,
        image: String,
        quantity: Number,
        price: Number,
      },
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    subtotal: Number,
    shipping: Number,
    total: Number,

    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery"],
      default: "Cash on Delivery",
    },

    orderStatus: {
      type: String,
      default: "PLACED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
