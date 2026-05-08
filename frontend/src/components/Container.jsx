import React, { useState, useEffect } from "react";
import Card from "./Card";
import Cardslider from "./Cardslider";
import { Link } from "react-router-dom";

export default function Container() {
  const images = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/uber_new_high._CB537689643_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2025/GW/BAU/Unrec/PC/934044814._CB551384116_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/GW/P42/Boult_3000x1200-PC._CB543542644_.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollLeft = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-[#E3E6E6] h-full">
      <div className="relative">
        <div>
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-50 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 cursor-pointer opacity-75 hover:opacity-100 transition z-10"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {/* Image Carousel */}
          <div className="flex overflow-hidden w-full">
            <div className="flex-shrink-0 w-full">
              <Link to="/products">
                <img
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </Link>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-50 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 cursor-pointer opacity-75 hover:opacity-100 transition z-10"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0), #E3E6E6 32%)",
          }}
        ></div>

        {/* Cards Section */}
        <div className="flex justify-center absolute top-64 w-full px-4 md:px-0">
          <div className="flex gap-5 flex-wrap justify-center">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        <div className="flex justify-center w-full mt-6 relative pb-5 px-4 md:px-0">
          <div className="flex gap-5 flex-wrap justify-center">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        {/* Slider Section */}
        <div className="flex justify-center w-full relative pb-5 px-4 md:px-0">
          <Cardslider></Cardslider>
        </div>

        <div className="flex justify-center w-full relative pb-5 px-4 md:px-0">
          <div className="flex gap-5 flex-wrap justify-center">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        <div className="flex justify-center w-full relative pb-5 px-4 md:px-0">
          <Cardslider></Cardslider>
        </div>
      </div>
    </div>
  );
}
