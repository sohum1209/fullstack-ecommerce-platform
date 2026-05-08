import { useState, useEffect, useRef } from "react";
import products from "../assets/products";
import logo from "../assets/1688364164amazon-logo-transparent.png";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./context/Cartcontext";
import { useAuth } from "./context/Authcontext";

export default function Header() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dropdownRef = useRef();
  const userMenuRef = useRef();

  // ── Search logic ──────────────────────────────────────────
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (product) => {
    setQuery(product.title);
    setShowDropdown(false);
  };

  // ── Close dropdowns on outside click ─────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Logout handler ────────────────────────────────────────
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <>
      {/* ── Top navbar ───────────────────────────────────── */}
      <nav className="bg-[#131921] sticky top-0 w-full z-50 shadow-lg">
        <div className="flex items-center gap-2 px-4 py-3 max-w-7xl mx-auto">

          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 border-2 border-transparent hover:border-white rounded p-1 transition-all duration-200"
          >
            <img src={logo} className="h-8" alt="Amazon Logo" />
          </Link>

          {/* Delivery location */}
          <div className="hidden lg:flex items-center gap-1 text-white flex-shrink-0 ml-1 cursor-pointer group">
            <i className="fas fa-map-marker-alt text-white text-sm mt-3"></i>
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">Delivering to</span>
              <span className="text-white text-xs font-bold group-hover:text-amber-400 transition-colors">
                Panjim 403001
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div ref={dropdownRef} className="relative flex flex-1 mx-2">
            {/* Category selector */}
            <select className="hidden md:block bg-gray-200 text-gray-700 text-xs px-2 rounded-l-md border-r border-gray-300 cursor-pointer hover:bg-gray-300 transition-colors outline-none h-10">
              <option>All</option>
              <option>Beauty</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
              <option>Books</option>
            </select>

            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              className="flex-1 h-10 px-3 text-sm text-gray-800 bg-white outline-none"
              placeholder="Search Amazon.in"
            />
            <button className="h-10 px-4 bg-amber-400 hover:bg-amber-500 transition-colors rounded-r-md flex items-center justify-center">
              <i className="fas fa-search text-gray-800"></i>
            </button>

            {/* Search suggestions dropdown */}
            {showDropdown && (
              <ul className="absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-md shadow-xl z-50 max-h-72 overflow-y-auto">
                {suggestions.length > 0 ? (
                  suggestions.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                    >
                      <li className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-9 h-9 object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-800 line-clamp-1">
                            {product.title}
                          </span>
                          <span className="text-xs text-amber-600 font-semibold">
                            ₹{product.price}
                          </span>
                        </div>
                      </li>
                    </Link>
                  ))
                ) : (
                  <li className="px-4 py-3 text-sm text-gray-500 text-center">
                    No results found for "{query}"
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-1 flex-shrink-0">

            {/* ── Auth section: Login button OR Hello {name} ── */}
            {user ? (
              // ── Logged in — show user menu ──────────────────
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  className="flex flex-col items-start text-white px-2 py-1 rounded hover:bg-white/10 transition-colors border-2 border-transparent hover:border-white/20"
                >
                  <span className="text-xs text-gray-300">Hello,</span>
                  <span className="text-sm font-bold flex items-center gap-1">
                    {user.name}
                    <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""}`}></i>
                  </span>
                </button>

                {/* Dropdown menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-2xl z-50 border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/orders"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <i className="fas fa-box text-amber-500 w-4"></i>
                      My Orders
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <i className="fas fa-shopping-cart text-amber-500 w-4"></i>
                      My Cart
                    </Link>
                    <hr className="border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <i className="fas fa-sign-out-alt w-4"></i>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // ── Not logged in — show Login button ───────────
              <Link
                to="/login"
                className="flex flex-col items-start text-white px-2 py-1 rounded hover:bg-white/10 transition-colors border-2 border-transparent hover:border-white/20"
              >
                <span className="text-xs text-gray-300">Hello, sign in</span>
                <span className="text-sm font-bold flex items-center gap-1">
                  Account
                  <i className="fas fa-chevron-down text-xs"></i>
                </span>
              </Link>
            )}

            {/* Returns & Orders */}
            <Link
              to="/orders"
              className="hidden md:flex flex-col items-start text-white px-2 py-1 rounded hover:bg-white/10 transition-colors border-2 border-transparent hover:border-white/20"
            >
              <span className="text-xs text-gray-300">Returns</span>
              <span className="text-sm font-bold">&amp; Orders</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-end gap-1 text-white px-2 py-1 rounded hover:bg-white/10 transition-colors border-2 border-transparent hover:border-white/20"
            >
              <div className="relative">
                <i className="fas fa-shopping-cart text-2xl"></i>
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </div>
              <span className="hidden md:block text-sm font-bold mb-0.5">Cart</span>
            </Link>

          </div>
        </div>
      </nav>

      {/* ── Bottom category nav ───────────────────────────── */}
      <nav className="bg-[#232f3e]">
        <div className="max-w-screen-xl mx-auto px-4">
          <ul className="flex items-center gap-1 overflow-x-auto text-white text-sm py-2 scrollbar-hide">
            <li className="flex-shrink-0">
              <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 transition-colors font-bold border border-transparent hover:border-white/20">
                <i className="fas fa-bars text-xs"></i> All
              </button>
            </li>
            {[
              { label: "Today's Deals",        to: "/products" },
              { label: "Customer Service",      to: "/" },
              { label: "New Releases",          to: "/products" },
              { label: "Bestsellers",           to: "/products" },
              { label: "Prime",                 to: "/" },
              { label: "Electronics",           to: "/products" },
              { label: "Fashion",               to: "/products" },
              { label: "Home & Kitchen",        to: "/products" },
              { label: "Books",                 to: "/products" },
              { label: "Beauty",                to: "/products" },
              { label: "Computers",             to: "/products" },
            ].map((item) => (
              <li key={item.label} className="flex-shrink-0">
                <Link
                  to={item.to}
                  className="block px-2 py-1 rounded hover:bg-white/10 transition-colors whitespace-nowrap border border-transparent hover:border-white/20"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}