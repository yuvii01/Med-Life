import React, { useState } from 'react';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateMedi = () => {
  const user = useSelector(store => store.user);
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    timing: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.date.value) ;
    const mediData = new FormData();
    mediData.append('name', formData.name);
    mediData.append('quantity', formData.quantity);
    mediData.append('timing', formData.timing);
    mediData.append('date', e.target.date.value);
    mediData.append('user_id', user?.data._id);
    console.log("user id is" , user.data._id) ;

    mediData.append('description', formData.description);
    if (file) mediData.append('image', file);


    try {
      const response = await axios.post('http://localhost:5000/api/medi', mediData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      navigate('/');
    }
    catch (error) {
      console.error('Error creating Medi:', error);
      alert('Failed to create Medi.');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create Medi
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Medi name"
                required
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
              Quantity
            </label>
            <div className="mt-2">
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                required
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          

          <div>
            <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
              Date
            </label>
            <div className="mt-2">
              <input
                id="date"
                name="date"
                type="date"
                placeholder="Enter Medi Date"
                required
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <div>
            <label htmlFor="timing" className="block text-sm font-medium leading-6 text-gray-900">
              Timing
            </label>
            <div className="mt-2">
              <input
                id="timing"
                name="timing"
                type="text"
                value={formData.timing}
                onChange={handleChange}
                placeholder="e.g., Morning, Evening"
                required
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Medi description"
                required
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Upload Image
            </label>
            <div className="mt-2">
              <FileUploader handleChange={handleFileChange} name="file" />
              {file && <p className="mt-2 text-sm text-gray-700">Selected file: {file.name}</p>}
              {file && (
                <button
                  type="button"
                  onClick={removeFile}
                  className="mt-2 text-sm text-red-500 hover:underline"
                >
                  Remove File
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Medi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMedi;
