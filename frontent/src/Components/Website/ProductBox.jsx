import React, { useContext } from 'react';
import { FaStar } from "react-icons/fa";
import { Context } from '../../Context/MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Reducers/cartSlice';
import axios from 'axios';

const ProductBox = ({ _id, name, image, price, discount_percent, discount_price, rating = 4 }) => {
    const { productImageUrl, API_BASE_URL, CART_BASE_URL } = useContext(Context);
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

    return (
        <div>


            
            <div className='border pt-6 m-3 cursor-pointer shadow-lg flex flex-col justify-center items-center rounded-lg'>
                <img src={API_BASE_URL + productImageUrl + image} className='w-[236px] h-[160px] hover:scale-90' />
                <div className='mt-[30px] font-semibold text-[16px]'>{name}</div>

                <Stars yellow={rating} />
                {
                    discount_percent == 0 ?
                        <span className='text-[red]'>₹ {discount_price}</span>

                        : <div>
                            <p>  {discount_percent} % off</p>
                            <div className=' flex gap-4 my-2'>
                                <span className='text-[red]'>₹{discount_price}</span>
                                <span className='text-[#C1C8CE] line-through'>₹ {price}</span>
                            </div>
                        </div>
                }
                <span onClick={() => {
                    dispatcher(addToCart({ price: discount_price, pId: _id, qty: 1 }));
                    addToDbCart(_id)
                }
                } className='w-[50%] my-2 mx-auto rounded-xl  text-white py-1.5 bg-yellow-400 text-center'>Add To Cart</span>

            </div>

        </div>
    );
}

function Stars({ yellow }) {
    let starts = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= yellow) {
            starts.push(<FaStar key={i} className='text-[#FFC600]' />);
        } else {
            starts.push(<FaStar key={i} className='text-[#C1C8CE]' />);
        }
    }
    return <div className='text-[16px] flex mt-5'>{starts}</div>
}
export default ProductBox;
