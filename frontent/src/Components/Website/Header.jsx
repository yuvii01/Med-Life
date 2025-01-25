import React, { useEffect, useState } from 'react';
import Container from '../Container';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Reducers/UserSlice';
import { emptyCart } from '../../Reducers/cartSlice';

const Header = () => {

    const [toggle, setToggle] = useState(false);
    const dispatcher = useDispatch();
    const cart = useSelector(store => store.cart);
    const navigate = useNavigate() ;
    function convertTimestampToDate() {
      const now = new Date();

      // Format the date components
      const weekday = now.toLocaleString('en-US', { weekday: 'short' });
      const month = now.toLocaleString('en-US', { month: 'short' });
      const day = now.getDate();
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
  
      // Combine them into the desired format
      return `${weekday} ${month} ${day} ${year}`;
  }

    const user = useSelector(store => store.user);
    
    return (
        <header className=' sticky top-0 bg-white z-[9999999999] pt-10 px-10'>
     <div className="flex items-center justify-between mb-6">
        <div>
        {user && user.data ? (
        <h1 className="text-2xl font-semibold text-gray-800">
            Hey, <span className="text-indigo-600">{user.data.name}</span> 👋
        </h1>
    ) : (
        <h1 className="text-2xl font-semibold text-gray-800">
            <span className="text-indigo-600">Login...</span> 👋
        </h1>
    )}
    <p className="text-gray-500">
        {user && user.data ? `Today, ${
            convertTimestampToDate()
          }` : ''}
    </p>
        </div>
        <h2 onClick={() => {
          navigate('buy_medicine')
        }} className="text-xl font-semibold text-gray-800 ps-[700px]">
            <span className="text-indigo-600">Buy Medicines 💊</span> 
        </h2>
        <div>

        </div>
        <div className="flex items-center space-x-6">
         { user && user.data ? <button className="scale-200 bg-gray-100 rounded-full">
            <img
              src={`http://localhost:5000/image/profile/${user.data.Image}`}
              alt="User"
              className="rounded-full w-[70px] h-[70px]"
            />
          </button> : <button></button>  }
          <button className="p-2 bg-gray-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>

    
        </header >
    );
}

export default Header;
