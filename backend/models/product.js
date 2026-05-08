const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
  },
  reviewerName: {
    type: String,
  },
  reviewerEmail: {
    type: String,
  },
});

const dimensionsSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  depth: Number,
});

const metaSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  barcode: {
    type: String,
  },
  qrCode: {
    type: String,
  },
});

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true, // since it's like an external id
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,
    dimensions: dimensionsSchema,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    reviews: [reviewSchema],
    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: metaSchema,
    images: [String],
    thumbnail: String,
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

const product = mongoose.model("product", productSchema);

module.exports = product;