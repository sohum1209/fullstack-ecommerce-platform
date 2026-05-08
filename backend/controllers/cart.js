const Cart = require("../models/cart");

// ── Get cart ─────────────────────────────────────────────────
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId"); // replaces productId with full product object

    // if user has no cart yet, return empty
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ── Add item to cart ──────────────────────────────────────────
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    //Check if cart document already exists for the user
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      // first time this user adds anything — create their cart document
      cart = await Cart.create({
        userId: req.user.id,
        items: [{ productId, quantity }],
      });
    } else {
      // cart exists — check if product is already in it
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        // product already in cart — just increase quantity
        existingItem.quantity += quantity;
      } else {
        // new product — push it in
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    // populate before sending back so frontend gets full product data
    await cart.populate("items.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ── Remove item / decrease quantity ───────────────────────────
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingItem)
      return res.status(404).json({ error: "Item not in cart" });

    if (existingItem.quantity > 1) {
      // just decrease quantity
      existingItem.quantity -= 1;
    } else {
      // remove the item entirely
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
    }

    await cart.save();
    await cart.populate("items.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ── Delete item entirely regardless of quantity ───────────────
const deleteFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ── Clear entire cart ─────────────────────────────────────────
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items: [] }
    );
    res.json({ items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, deleteFromCart, clearCart };