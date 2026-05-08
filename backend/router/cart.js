const router = require("express").Router();
const protect = require("../middleware/auth");
const {
    getCart,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
} = require("../controllers/cart");

// every cart route is protected — must be logged in
router.use(protect);

router.get("/", getCart);
router.post("/add", addToCart);
router.patch("/remove/:productId", removeFromCart);   // decrease by 1
router.delete("/item/:productId", deleteFromCart);   // remove entirely
router.delete("/clear", clearCart);

module.exports = router;