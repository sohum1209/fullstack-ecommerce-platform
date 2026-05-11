import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
// import products from "../../assets/products";
import Sidebar from "../Sidebar";
import { FetchAllProducts } from "../../utils/api"
export default function Products() {
  const [products, setProducts] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {

        const data = await FetchAllProducts();
        setProducts(data.data);

      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchDiscount =
      selectedDiscounts.length === 0 ||
      selectedDiscounts.some(
        (discount) => product.discountPercentage >= discount
      );

    return matchCategory && matchDiscount;
  });

  // console.log("Filtered Products: ", filteredProducts)

  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
  };

  const handleDiscountSelect = (discounts) => {
    setSelectedDiscounts(discounts);
  };

  return (
    <div className="flex">
      <div className="basis-1/5 p-4">
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          selectedDiscounts={selectedDiscounts}
          onCategorySelect={handleCategorySelect}
          onDiscountSelect={handleDiscountSelect}
        />
      </div>

      {/* Product Grid */}

      {filteredProducts.length === 0 ? (
        <h2 className="text-center text-3xl font-semibold mt-5">No Products Found</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 ">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.title}
              img={product.thumbnail}
              price={product.price}
              discountPercent={product.discountPercentage}
              rating={product.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}
