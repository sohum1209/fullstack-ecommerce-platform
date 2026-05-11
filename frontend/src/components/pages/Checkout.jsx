import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../context/Authcontext";
import { useCart } from "../context/Cartcontext";

const BASE_URL = "http://localhost:8000/api";

const initialAddress = {
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
};

export default function Checkout() {
  const { user } = useAuth();
  const { cart, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState(initialAddress);
  const [savedAddress, setSavedAddress] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const subtotal = getTotalPrice();
  const shipping = 0;
  const total = subtotal + shipping;

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress((current) => ({ ...current, [name]: value }));
  };

  const handleSaveAddress = (event) => {
    event.preventDefault();
    setError("");

    const hasMissingField = Object.values(shippingAddress).some((value) => !value.trim());
    if (hasMissingField) {
      setError("Please complete all shipping address fields.");
      return;
    }

    setSavedAddress(shippingAddress);
  };

  const handlePlaceOrder = async () => {
    setError("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty. Add items before placing an order.");
      return;
    }

    if (!savedAddress) {
      setError("Please save your shipping address before placing the order.");
      return;
    }

    try {
      setIsPlacingOrder(true);
      const token = Cookies.get("token");
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.id || item._id,
            title: item.title,
            image: item.thumbnail,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress: savedAddress,
          subtotal,
          shipping,
          total,
          paymentMethod: "Cash on Delivery",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      await clearCart();
      navigate("/orders", { state: { orderPlaced: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-gray-600">Add products to your cart before starting checkout.</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-md bg-yellow-400 px-6 py-3 font-semibold text-gray-900 hover:bg-yellow-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Checkout</h1>
          <p className="mt-1 text-sm text-gray-600">Review your cart, add delivery details, and place your order.</p>
        </div>

        {error && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-xl font-semibold text-gray-900">1. Review Cart Items</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.id || item._id} className="flex gap-4 p-5">
                    <img src={item.thumbnail} alt={item.title} className="h-20 w-20 rounded-md object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900">${item.price}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-xl font-semibold text-gray-900">2. Shipping Address</h2>
              </div>
              <form onSubmit={handleSaveAddress} className="grid gap-4 p-5 sm:grid-cols-2">
                <input name="fullName" value={shippingAddress.fullName} onChange={handleAddressChange} placeholder="Full name" className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-yellow-500 sm:col-span-2" />
                <input name="phone" value={shippingAddress.phone} onChange={handleAddressChange} placeholder="Phone number" className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-yellow-500" />
                <input name="pincode" value={shippingAddress.pincode} onChange={handleAddressChange} placeholder="Pincode" className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-yellow-500" />
                <input name="street" value={shippingAddress.street} onChange={handleAddressChange} placeholder="Address" className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-yellow-500 sm:col-span-2" />
                <input name="city" value={shippingAddress.city} onChange={handleAddressChange} placeholder="City" className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-yellow-500" />
                <input name="state" value={shippingAddress.state} onChange={handleAddressChange} placeholder="State" className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-yellow-500" />

                <button type="submit" className="rounded-md bg-gray-900 px-5 py-2 font-semibold text-white hover:bg-gray-800 sm:col-span-2">
                  {savedAddress ? "Update Address" : "Save Address"}
                </button>
              </form>
            </section>

            <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">3. Payment Method</h2>
              <div className="mt-4 rounded-md border border-yellow-300 bg-yellow-50 p-4">
                <p className="font-semibold text-gray-900">Cash on Delivery</p>
                <p className="mt-1 text-sm text-gray-600">Pay in cash when your order arrives.</p>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">4. Order Summary</h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-medium text-green-700">Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            {savedAddress && (
              <div className="mt-5 rounded-md bg-gray-50 p-4 text-sm text-gray-700">
                <p className="font-semibold text-gray-900">Deliver to</p>
                <p className="mt-1">{savedAddress.fullName}, {savedAddress.phone}</p>
                <p>{savedAddress.street}, {savedAddress.city}, {savedAddress.state} - {savedAddress.pincode}</p>
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="mt-6 w-full rounded-md bg-yellow-400 px-6 py-3 font-semibold text-gray-900 shadow-sm hover:bg-yellow-500 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
