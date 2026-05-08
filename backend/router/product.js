const express = require("express")
const { FetchAllProducts, GetProductDetails } = require("../controllers/product")

const router = express.Router();

router.get("/", FetchAllProducts);
router.post("/", GetProductDetails)

module.exports = router;