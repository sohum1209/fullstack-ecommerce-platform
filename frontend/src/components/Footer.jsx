import React from "react";
import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Shop",
    links: ["New Arrivals", "Best Sellers", "Deals", "Gift Cards"],
  },
  {
    title: "Support",
    links: ["Help Center", "Shipping", "Returns", "Track Order"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact", "Stores"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <h2 className="text-2xl font-bold text-white">ShopEase</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
            Everyday products, simple shopping, and reliable delivery for your home, work, and lifestyle.
          </p>
          <div className="mt-5 flex gap-3 text-sm">
            <Link to="/" className="hover:text-white">Facebook</Link>
            <Link to="/" className="hover:text-white">Instagram</Link>
            <Link to="/" className="hover:text-white">Twitter</Link>
          </div>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-white">{section.title}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link}>
                  <Link to="/" className="hover:text-white">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 ShopEase. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="hover:text-white">Privacy Policy</Link>
            <Link to="/" className="hover:text-white">Terms of Service</Link>
            <Link to="/" className="hover:text-white">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
