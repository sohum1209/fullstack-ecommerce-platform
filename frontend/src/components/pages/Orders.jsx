import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../context/Authcontext";

const BASE_URL = "http://localhost:8000/api";

export default function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(`${BASE_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load orders");
        }

        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, user]);

  return (
    <div className="min-h-[70vh] bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Your Orders</h1>
          <p className="mt-1 text-sm text-gray-600">Track your recent purchases and delivery details.</p>
        </div>

        {location.state?.orderPlaced && (
          <div className="mb-5 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            Your order has been placed successfully.
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">No orders yet</h2>
            <p className="mt-2 text-gray-600">When you place an order, it will appear here.</p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-md bg-yellow-400 px-6 py-3 font-semibold text-gray-900 hover:bg-yellow-500"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <article key={order._id} className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="grid gap-4 border-b border-gray-200 bg-gray-50 px-5 py-4 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-gray-500">Order placed</p>
                    <p className="font-semibold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total</p>
                    <p className="font-semibold text-gray-900">${order.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment</p>
                    <p className="font-semibold text-gray-900">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-semibold text-green-700">{order.orderStatus}</p>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <div key={`${order._id}-${item.productId}`} className="flex gap-4 p-5">
                      <img src={item.image} alt={item.title} className="h-20 w-20 rounded-md object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">${item.price}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 px-5 py-4 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">Shipping Address</p>
                  <p className="mt-1">
                    {order.shippingAddress.fullName}, {order.shippingAddress.phone}
                  </p>
                  <p>
                    {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
