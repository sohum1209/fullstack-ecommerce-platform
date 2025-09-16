import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../../assets/products";
import { useCart } from "../context/Cartcontext";

export default function DetailProduct() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart(); 
  const [showPopup, setShowPopup] = useState(false); 

  if (!product) {
    return (
      <div className="text-center text-red-600 mt-10 text-lg font-semibold">
        Product not found.
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  
  useEffect(() => {
    setSelectedImage(product.images[0]);
  }, [product]);

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-6xl p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <img
              src={selectedImage}
              alt={product.title}
              className="rounded-lg w-full  object-cover transition duration-300"
            />

            {/* Thumbnail */}
            <div className="mt-4 flex gap-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title}-${index}`}
                  onClick={() => setSelectedImage(img)} 
                  className={`w-20 h-20 object-cover rounded border cursor-pointer hover:ring-2 transition duration-200 ${
                    selectedImage === img ? "ring-2 ring-orange-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-sm text-gray-500 mb-2 capitalize">
              {product.category}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-600 font-medium">
                {product.rating} / 5
              </span>
              <span className="text-sm text-gray-500">
                ({product.reviews.length} reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl font-bold ">${discountedPrice}</span>
              <span className="line-through text-red-500">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-green-600 font-semibold">
                {product.discountPercentage}% off
              </span>
            </div>

            {/* Stock & Shipping */}
            <div className="mb-4 space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Availability:</span>{" "}
                <span className={product.availabilityStatus==="In Stock"?"text-green-700":"text-red-700"}>
                  {product.availabilityStatus}
                </span>
              </p>
              <p>
                <span className="font-semibold">In Stock:</span> {product.stock}{" "}
                units
              </p>
              <p>
                <span className="font-semibold">Ships:</span>{" "}
                {product.shippingInformation}
              </p>
              <p>
                <span className="font-semibold">Return Policy:</span>{" "}
                {product.returnPolicy}
              </p>
              <p>
                <span className="font-semibold">Warranty:</span>{" "}
                {product.warrantyInformation}
              </p>
              <p>
                <span className="font-semibold">Fastest Delivery By:</span>{" "}
                <span className="text-black font-medium">
                  Wednesday, 10 September
                </span>
              </p>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h2 className="text-md font-semibold text-gray-800 mb-1">
                Product Description
              </h2>
              <p className="text-gray-700 text-sm">{product.description}</p>
            </div>

            {/* Specs */}
            <div className="mb-6">
              <h2 className="text-md font-semibold text-gray-800 mb-1">
                Specifications
              </h2>
              <ul className="text-sm text-gray-600 list-disc pl-5">
                <li>Weight: {product.weight} kg</li>
                <li>
                  Dimensions: {product.dimensions.width} x{" "}
                  {product.dimensions.height} x {product.dimensions.depth} cm
                </li>
                <li>Minimum Order Quantity: {product.minimumOrderQuantity}</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
                Buy Now
              </button>
              <button className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500" onClick={()=>handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Customer Reviews
          </h2>
          <div className="space-y-4">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="p-4 bg-gray-50">
                <div className="flex items-center text-lg space-x-2 mb-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-gray-700 font-medium">
                    {review.rating} / 5
                  </span>
                </div>
                <p className="text-gray-800 text-lg font-semibold italic">
                  "{review.comment}"
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  — {review.reviewerName} on{" "}
                  {new Date(review.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-md shadow-md">
          <p className="font-semibold">Item added to cart!</p>
        </div>
      )}
    </div>
  );
}
