import React, { useState, useEffect, useRef } from "react";
import products from "../assets/products";
import logo from "../assets/1688364164amazon-logo-transparent.png";
import { Link } from "react-router-dom";
import { useCart } from "./context/Cartcontext";

export default function Header() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { getCartCount } = useCart();

  const dropdownRef = useRef();

  // Handle input change and filter suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filteredSuggestions = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-[#131921] top-0 w-full z-50">
        <div className="flex items-center justify-between mx-auto p-4">
          {/* Logo and Location */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center">
              <img src={logo} className="h-8" alt="Amazon Logo" />
            </Link>

            <div id="location" className="hidden md:flex mx-2 text-white">
              <i className="fas fa-map-marker-alt text-white mx-1"></i>
              <div className="flex flex-col">
                <span className="text-gray-300 text-xs">
                  Delivering to Panjim 403001
                </span>
                <span className="text-white text-xs font-bold hover:underline cursor-pointer">
                  Update location
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div
            id="searchBar"
            className="relative flex flex-1 justify-center mx-4"
          >
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              className="w-full p-2 bg-white"
              placeholder="Search products..."
            />
            <button className="p-2 px-3 bg-amber-600 ">
              <i className="fas fa-search"></i>
            </button>

            {/* Dropdown Suggestions */}
            {showDropdown && suggestions.length > 0 && (
              <ul
                ref={dropdownRef}
                className="absolute w-full left-0 top-9 mt-1 bg-white border border-gray-300 rounded-b-lg shadow-md max-h-60 overflow-y-auto z-10"
              >
                {suggestions.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <li
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(product)}
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-10 h-10 object-cover mr-3"
                      />
                      <span>{product.title}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            )}

            {/* If no suggestions */}
            {showDropdown && suggestions.length === 0 && (
              <ul
                ref={dropdownRef}
                className="absolute w-full left-0 top-9 mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-10"
              >
                <li className="p-2 text-center text-gray-500">
                  No results found
                </li>
              </ul>
            )}
          </div>

          {/* Returns & Orders */}
          <div className="text-white hidden md:block px-2">
            <Link to="/" className="flex flex-col items-center">
              <span className="text-xs">Returns</span>
              <span className="font-bold text-sm"> &amp; Orders</span>
            </Link>
          </div>

          {/* Cart */}
          <div className="text-white hidden md:block px-2">
            <Link to="/cart" className="flex items-center">
              <i className="fas fa-shopping-cart mr-1"></i> Cart (
              {getCartCount()})
            </Link>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <nav className="bg-[#232f3e] py-2">
        <div className="px-4 mx-auto">
          <ul className="flex flex-wrap gap-4 justify-center text-white text-sm">
            <li>
              <Link to="/products" className="hover:underline">
                Today's Deals
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Customer Service
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                New Releases
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Bestsellers
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Prime
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Fashion
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Home & Kitchen
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Books
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Beauty & Personal Care
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Computers
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
