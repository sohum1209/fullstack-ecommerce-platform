// One-time script to migrate array-based products to MongoDB

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");
const products = require("./product-list");

async function seed() {
  try {
    // 1. Connect DB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");

    // 2. Optional safety check
    if (!products || !products.length) {
      throw new Error("Products array is empty!");
    }

    // 3. Clear existing data
    await Product.deleteMany({});
    console.log("Old products removed");

    // 4. Insert new data
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

  } catch (error) {
    console.error("Seeding error:", error.message);
  } finally {
    // 5. Always close connection
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
}

seed();