import React from "react";
import products from "../assets/products";
import { Link } from "react-router-dom";

export default function ProductSlider() {
  // Function to scroll to the left
  const scrollLeft = () => {
    document.getElementById("carousel").scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  // Function to scroll to the right
  const scrollRight = () => {
    document.getElementById("carousel").scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative px-5 py-4 bg-white" style={{ maxWidth: "1400px" }}>
      <div className="mt-1.5">
        <span className="font-bold text-2xl">Related To Items You Viewed</span>
        <span className="ml-5 text-sm hover:underline text-blue-700 font-semibold">
          <Link to={`/products`}>See More</Link>
        </span>
      </div>

      {/* Carousel Container */}
      <div className="relative flex items-center justify-between">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 cursor-pointer opacity-75 hover:opacity-100 transition"
          style={{ zIndex: 10 }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Carousel Content */}
        <div
          id="carousel"
          className="flex overflow-x-auto space-x-4 p-4 scrollbar-hidden"
        >
          {products.map((product, index) => (
            <div key={index} className="flex-shrink-0">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={`Product ${index}`}
                  className="w-48 h-48 object-cover rounded-lg"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 cursor-pointer opacity-75 hover:opacity-100 transition"
          style={{ zIndex: 10 }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
