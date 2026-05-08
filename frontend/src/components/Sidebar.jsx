import React from 'react';

export default function Sidebar({ categories, selectedCategories, selectedDiscounts, onCategorySelect, onDiscountSelect }) {
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      onCategorySelect(selectedCategories.filter(item => item !== category)); 
    } else {
      onCategorySelect([...selectedCategories, category]); 
    }
  };

  const handleDiscountChange = (discount) => {
    if (selectedDiscounts.includes(discount)) {
      onDiscountSelect(selectedDiscounts.filter(item => item !== discount));
    } else {
      onDiscountSelect([...selectedDiscounts, discount]); 
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-lg">
        <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
                {categories.map((category) => (
                <li key={category} className="flex items-center cursor-pointer hover:text-blue-500">
                    <input
                    type="checkbox"
                    id={category}
                    checked={selectedCategories.includes(category)} 
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                    />
                    <label htmlFor={category}>{category}</label>
                </li>
                ))}
            </ul>
        </div>
        <div>
            <h3 className="text-lg font-semibold mt-6 mb-4">Discount</h3>
            <ul className="space-y-2">
                {[10, 25, 35, 50, 60, 70].map((discount) => (
                <li key={discount} className="flex items-center cursor-pointer hover:text-blue-500">
                    <input
                    type="checkbox"
                    id={`discount-${discount}`}
                    checked={selectedDiscounts.includes(discount)} // Checked if selected
                    onChange={() => handleDiscountChange(discount)}
                    className="mr-2"
                    />
                    <label htmlFor={`discount-${discount}`}>{discount}% Off or more</label>
                </li>
                ))}
            </ul>
        </div>
    </div>
  );
}
