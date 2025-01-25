import React, { useContext, useState, useEffect } from "react";
import Select, { components } from "react-select";
import { Context } from "../../Context/MainContext";

const MedicineBuyingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);  // New loading state
  const { category, fetchCategory, products, fetchProduct } = useContext(Context);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      await fetchCategory(); // Assuming fetchCategory populates the 'category' state in context
      setLoading(false); // Set loading to false after data fetch
    };

    fetchCategories();
  }, [fetchCategory]);

  // Transform categories into select-compatible options
  const categoryOptions = category.map((cat) => ({
    value: cat._id,  // Use unique ID or value for category identification
    label: cat.name,  // Name of the category
    image: cat.image,  // Path to category image
  }));

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : [];

  // Custom component for dropdown options
  const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
      >
        <img
          src={`http://localhost:5000/image/category/${data.image}`}
          alt={data.label}
          className="w-8 h-8 rounded-full mr-3"
        />
        <span>{data.label}</span>
      </div>
    );
  };

  // Custom component for selected value
  const CustomSingleValue = (props) => {
    const { data } = props;
    return (
      <div className="flex items-center">
        <img
          src={`http://localhost:5000/image/category/${data.image}`}
          alt={data.label}
          className="w-5 h-5 rounded-full mr-2"
        />
        <span>{data.label}</span>
      </div>
    );
  };

  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected?.value || null);
  };

  if (loading) {
    return <div>Loading categories...</div>;  // Show loading message while fetching categories
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buy Medicines</h1>
      <div className="mb-6">
        <Select
          options={categoryOptions}
          onChange={handleCategoryChange}
          value={categoryOptions.find((cat) => cat.value === selectedCategory)} // Ensure the correct category is selected
          placeholder="Select a category"
          components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
        />
      </div>

      {selectedCategory && filteredProducts.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Products for {categoryOptions.find((cat) => cat.value === selectedCategory)?.label}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600">Price: {product.price}</p>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">
          {selectedCategory
            ? "No products available for the selected category."
            : "Please select a category to see the products."}
        </p>
      )}
    </div>
  );
};

export default MedicineBuyingPage;
