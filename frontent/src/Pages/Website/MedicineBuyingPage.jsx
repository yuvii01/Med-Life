import React, { useContext, useState, useEffect } from "react";
import Select, { components } from "react-select";
import { Context } from "../../Context/MainContext";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Reducers/cartSlice';
import axios from 'axios';

const MedicineBuyingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);  // New loading state
  const { category, fetchCategory, products, fetchProduct  , productImageUrl, API_BASE_URL, CART_BASE_URL} = useContext(Context);
  console.log("products are", products);
  const dispatcher = useDispatch();
  const user = useSelector(store => store.user);
  const addToDbCart = (pId) => {
    if (user.data != null) {
        axios.post(API_BASE_URL + CART_BASE_URL + "/add-to-cart", { user_id: user.data._id })
            .then(
                (success) => {
                  
                }
            ).catch(
                (error) => {

                }
            )
    } else {

    }
}



  const links = [
    {
      "tata" : "https://www.1mg.com/drugs/crocin-advance-500mg-tablet-600468" ,
      "appolo" : "https://www.apollopharmacy.in/otc/pacimol-650mg-tablet?doNotTrack=true" ,
    }
  ]


  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      await fetchCategory(); // Assuming fetchCategory populates the 'category' state in context
      setLoading(false); // Set loading to false after data fetch
    };

    fetchCategories();
  }, []);

  // Transform categories into select-compatible options
  const categoryOptions = category.map((cat) => ({
    value: cat._id,  // Use unique ID or value for category identification
    label: cat.name,  // Name of the category
    image: cat.image,  // Path to category image
  }));

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_id._id === selectedCategory) // Compare with categoryId
    : products;

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
    console.log("selected category:", selected);
    setSelectedCategory(selected?.value || null);  // Store category id instead of label
  };

  if (loading) {
    return <div>Loading categories...</div>;  // Show loading message while fetching categories
  }
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
  <h1 className="text-3xl font-bold mb-6 text-center">
    Buy Medicines from Trusted Sources
  </h1>
  <div className="mb-6">
    <Select
      options={categoryOptions}
      onChange={handleCategoryChange}
      value={categoryOptions.find((cat) => cat.value === selectedCategory)} // Ensure the correct category is selected
      placeholder="Select a category"
      components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
    />
  </div>

  {filteredProducts.length > 0 ? (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {selectedCategory
          ? categoryOptions.find((cat) => cat.value === selectedCategory)?.label
          : "Popular Medicines"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Medicine Header */}
            <div className="flex items-center mb-4">
              <img
                src={`http://localhost:5000/image/product/${product.image}`}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Price: <span className="font-medium">{product.price}</span>
                </p>
              </div>
            </div>

            {/* Trusted Sources */}
            <div className="flex space-x-4 items-center mt-4">
              <div className="w-12 h-12 overflow-hidden rounded-full">
                <img
                  src="/1mg.png"
                  alt="1mg"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-12 h-12 overflow-hidden rounded-full">
                <img
                  src="/appolo.png"
                  alt="Apollo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-gray-500 text-center">
      {selectedCategory
        ? "No products available for the selected category."
        : "Please select a category to see the products."}
    </p>
  )}
</div>
  );
};

export default MedicineBuyingPage;
