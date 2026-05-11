const product = require("../models/product");

async function FetchAllProducts(req, res) {
    try {
        const products = await product.find({}, "title thumbnail price discountPercentage rating category");
        return res.json({ data: products });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function GetProductDetails(req, res) {
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: "Bad Request" });

    try {
        const details = await product.findOne({ _id: id });
        return res.status(200).json({ message: "Request Successful", data: details })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


module.exports = { FetchAllProducts, GetProductDetails };