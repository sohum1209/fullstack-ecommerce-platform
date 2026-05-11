import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/Cartcontext';

const CHECKOUT_PATH = '/checkout';

function Cart() {
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-[70vh] bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">Shopping Cart</h2>
          <p className="mt-1 text-sm text-gray-600">
            Review your selected items before checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100">
                <span className="text-4xl font-bold text-yellow-700" aria-hidden="true">
                  0
                </span>
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-900">Your cart is empty</h3>
              <p className="mb-8 max-w-md text-gray-600">
                Looks like you have not added anything yet. Browse products and add your favorites to your cart.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-md bg-yellow-400 px-6 py-3 font-semibold text-gray-900 shadow-sm transition-colors hover:bg-yellow-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <h3 className="text-xl font-semibold text-gray-900">Cart Items</h3>
                <span className="text-sm text-gray-600">
                  {cart.length} item{cart.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-32 w-full rounded-md object-cover sm:h-28 sm:w-28"
                    />

                    <div className="flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                          <p className={`mt-1 text-sm font-medium ${product.availabilityStatus === 'In Stock' ? 'text-green-700' : 'text-red-700'}`}>
                            {product.availabilityStatus}
                          </p>
                        </div>
                        <div className="text-xl font-bold text-gray-900">${product.price}</div>
                      </div>

                      <div className="mt-3 grid gap-1 text-sm text-gray-600">
                        <p>
                          Quantity: <span className="font-medium text-gray-900">{product.quantity}</span>
                        </p>
                        <p>{product.warrantyInformation}</p>
                        <p>{product.shippingInformation}</p>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="mt-4 inline-flex font-semibold text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">Calculated at checkout</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <Link
                to={CHECKOUT_PATH}
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-yellow-400 px-6 py-3 font-semibold text-gray-900 shadow-sm transition-colors hover:bg-yellow-500"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
