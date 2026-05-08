import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/Cartcontext";
import { GetProductDetails } from "../../utils/api";

export default function DetailProduct() {
  const { id } = useParams();
  console.log("Product ID from URL:", id); // Debug log

  // ✅ Correct initial states
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const { addToCart } = useCart();

  // ✅ Fetch product
  useEffect(() => {
    async function getData() {
      try {
        const details = await GetProductDetails({ id });
        setProduct(details.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [id]);

  // ✅ Set default image safely
  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  // ✅ Loading state
  if (!product) {
    return (
      <div className="text-center text-red-600 mt-10 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // ✅ Safe calculations
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
              className="rounded-lg w-full object-cover"
            />

            <div className="mt-4 flex gap-2">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title}-${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded border cursor-pointer ${
                    selectedImage === img ? "ring-2 ring-orange-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            <p className="text-sm text-gray-500 capitalize">
              {product.category}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <span>★</span>
              <span>{product.rating} / 5</span>
              <span>({product.reviews?.length || 0} reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl font-bold">
                ${discountedPrice}
              </span>
              <span className="line-through text-red-500">
                ${product.price?.toFixed(2)}
              </span>
              <span className="text-green-600">
                {product.discountPercentage}% off
              </span>
            </div>

            {/* Stock Info */}
            <div className="mb-4 text-sm">
              <p>
                Availability:{" "}
                <span>
                  {product.availabilityStatus}
                </span>
              </p>
              <p>Stock: {product.stock}</p>
              <p>Shipping: {product.shippingInformation}</p>
              <p>Return: {product.returnPolicy}</p>
              <p>Warranty: {product.warrantyInformation}</p>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h2 className="font-semibold">Description</h2>
              <p>{product.description}</p>
            </div>

            {/* Specs */}
            <div className="mb-6">
              <h2 className="font-semibold">Specifications</h2>
              <ul className="list-disc pl-5">
                <li>Weight: {product.weight} kg</li>
                <li>
                  Dimensions:{" "}
                  {product.dimensions?.width} x{" "}
                  {product.dimensions?.height} x{" "}
                  {product.dimensions?.depth}
                </li>
                <li>
                  Min Order: {product.minimumOrderQuantity}
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="bg-orange-500 text-white px-6 py-2 rounded">
                Buy Now
              </button>
              <button
                className="bg-yellow-400 px-6 py-2 rounded"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">Customer Reviews</h2>

          <div className="space-y-4">
            {product.reviews?.map((review, idx) => (
              <div key={idx} className="p-4 bg-gray-50">
                <p>⭐ {review.rating} / 5</p>
                <p>"{review.comment}"</p>
                <p>
                  — {review.reviewerName} on{" "}
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded">
          Item added to cart!
        </div>
      )}
    </div>
  );
}