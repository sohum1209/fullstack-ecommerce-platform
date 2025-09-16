import React from 'react';
import { useCart } from '../context/Cartcontext';

function Cart() {
  const { cart, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-lg text-gray-600">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          
          <div className="space-y-6">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b py-4"
              >
                
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded-md"
                />

                
                <div className="flex-1 pl-4">
                  <h3 className="text-lg font-medium">{product.title}</h3>
                  <p className={`text-sm ${product.availabilityStatus==="In Stock"?"text-green-700":"text-red-700"}`}>{product.availabilityStatus}</p>
                  <p className="text-lg font-medium">Quantity: {product.quantity}</p>
                  <p className="text-sm text-gray-500">{product.warrantyInformation}</p>
                  <p className="text-sm text-gray-500">{product.shippingInformation}</p>
                </div>

                
                <div className="text-lg font-semibold mr-28">${product.price}</div>

                
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          
          <div className="flex justify-end items-center mt-6 border-t pt-4">
            <h3 className="text-xl font-semibold">Total:</h3>
            <div className="text-2xl font-bold">${getTotalPrice()}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
