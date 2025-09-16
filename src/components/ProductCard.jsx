import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const {id, name, img, price, discountPercent, rating } = props;
  const ratingNumber =
    typeof rating === "number" ? rating : parseFloat(rating) || 0;

  const getStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 22 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.87 1.78a1 1 0 011.79 0l2.1 4.25 4.69.68a1 1 0 01.55 1.7l-3.4 3.32.8 4.67a1 1 0 01-1.45 1.05L11 15.27l-4.19 2.2a1 1 0 01-1.45-1.05l.8-4.67-3.4-3.32a1 1 0 01.55-1.7l4.69-.68 2.1-4.25z" />
        </svg>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg
          viewBox="0 0 22 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-yellow-300"
        >
          <defs>
            <clipPath id="left-half">
              <rect x="0" y="0" width="11" height="20" />
            </clipPath>
          </defs>
          <path
            clipPath="url(#left-half)"
            d="M10.87 1.78a1 1 0 011.79 0l2.1 4.25 4.69.68a1 1 0 01.55 1.7l-3.4 3.32.8 4.67a1 1 0 01-1.45 1.05L11 15.27l-4.19 2.2a1 1 0 01-1.45-1.05l.8-4.67-3.4-3.32a1 1 0 01.55-1.7l4.69-.68 2.1-4.25z"
          />
        </svg>
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
          fill="currentColor"
          viewBox="0 0 22 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.87 1.78a1 1 0 011.79 0l2.1 4.25 4.69.68a1 1 0 01.55 1.7l-3.4 3.32.8 4.67a1 1 0 01-1.45 1.05L11 15.27l-4.19 2.2a1 1 0 01-1.45-1.05l.8-4.67-3.4-3.32a1 1 0 01.55-1.7l4.69-.68 2.1-4.25z" />
        </svg>
      );
    }

    return stars;
  };

  const originalPrice = Math.round(price / (1 - discountPercent / 100));

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm">
      <Link to={`/product/${id}`} className="flex justify-center">
        <img
          className="rounded-t-lg w-fit h-48 object-cover"
          src={img}
          alt={name}
        />
      </Link>
      <div className="p-5">
        <Link to={`/product/${id}`}>
          <h5 className="mb-2 text-xl text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>

        {/* Price Section */}
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-xl font-semibold">
            ${price}.00
          </span>
          <span className="text-xs text-gray-500 line-through">
            ${originalPrice}.00
          </span>
          <span className="text-sm font-medium 
           px-2 py-0.5 rounded">
            ({discountPercent}% off)
          </span>
        </div>

        {/* Rating Section */}
        <div className="flex items-center space-x-1">
          {getStars(ratingNumber)}
          <span className="ml-2 text-sm text-gray-600">
            {ratingNumber.toFixed(1)} / 5
          </span>
        </div>
        <div className="text-sm font-light py-1 rounded">
          Fastest delivery by <span className="font-bold">10 September, Wednesday</span>
        </div>
      </div>
    </div>
  );
}
