import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CiSearch } from "react-icons/ci";
import { FaLanguage } from "react-icons/fa";

const Header = () => {
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility

  const convertTimestampToDate = () => {
    const now = new Date();
    const weekday = now.toLocaleString('en-US', { weekday: 'short' });
    const month = now.toLocaleString('en-US', { month: 'short' });
    const day = now.getDate();
    const year = now.getFullYear();
    return `${weekday} ${month} ${day} ${year}`;
  };

  return (
    <header className="sticky top-0 bg-white z-50 p-4 md:p-6 shadow-md">
      <div className="flex items-center justify-between">
        {/* Left Section: User Photo and Greeting */}
        <div className="flex items-center space-x-4">
          {user && user.data ? (
            <img
              src={`http://localhost:5000/image/profile/${user.data.Image}`}
              alt="User"
              className="rounded-full w-10 h-10 cursor-pointer"
              onClick={() => navigate('/')}
            />
          ) : (
            <div className="rounded-full w-10 h-10 bg-gray-200"></div>
          )}
          <div>
            <h1 className="text-sm font-medium text-gray-800">
              Welcome back,{' '}
              <span className="text-[#205781]">
                {user && user.data ? user.data.name : 'Guest'}
              </span>
            </h1>
            <p className="text-xs text-gray-500">
              {user && user.data ? `Today, ${convertTimestampToDate()}` : ''}
            </p>
          </div>
        </div>

        {/* Right Section: Search and Notification Icons */}
        <div className="flex items-center space-x-4">
        <button
            onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
            className="p-2 bg-gray-100 rounded-full"
          >
            <CiSearch className="text-xl font-semibold" />
          </button>

          {showDropdown && (
            <div className="absolute right-[10px] mt-[180px] w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li
                  onClick={() => {navigate('/buy_medicine')
                    setShowDropdown(!showDropdown)}
                  }
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                >
                  Buy Medicines
                </li>
                <li
                  onClick={() => {
                    window.location.href = 'http://localhost:8501/';
                    setShowDropdown(!showDropdown);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                >
                  Quick Tests
                </li>
                <li
                  onClick={() => {navigate('/doctors')
                    setShowDropdown(!showDropdown)}
                  }
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                >
                  Looking for Doctors
                </li>
              </ul>
            </div>
          )}

          <button
            onClick={() => console.log('Notifications clicked')}
            className="p-2 bg-gray-100 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;