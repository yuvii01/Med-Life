import React, { useContext, useEffect } from 'react';
import { BsBagCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from "react-icons/io";
import { Context } from '../../Context/MainContext';
import { changeCartQty, removeFromCart } from '../../Reducers/cartSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const user = useSelector(store => store.user);

    const cart = useSelector(store => store.cart);
    const navigator = useNavigate();
    const dispatcher = useDispatch();
    const { products, productImageUrl, API_BASE_URL, fetchProduct, CART_BASE_URL } = useContext(Context);

    useEffect(
        () => {
            fetchProduct()
        }, []
    )

    const cartProduct = [];
    for (let p of products) {
        for (let c of cart.data) {
            if (c.pId == p._id) {
                cartProduct.push(
                    {
                        ...c,
                        ...p
                    }
                )
            }
        }
    }

    const updateDbCart = (pId, newQty) => {
        if (user.data != null) {
            axios.put(API_BASE_URL + CART_BASE_URL + "/change-quantity",
                { user_id: user.data._id, pId, newQty }
            )
        }
    }

    const removeFromDbCart = (pId) => {
        if (user.data != null) {
            axios.post(API_BASE_URL + CART_BASE_URL + "/remove-from-cart",
                {
                    user_id: user.data._id, pId
                })
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


    const checkout = () => {
        if (user.data == null) {
            navigator("/login")
        } else {
            navigator("/checkout")

        }
    }
    return (
        <div>
            {
                cart.data == 0 ?

                    <div className='bg-gradient-to-r mt-14 flex items-center justify-center'>
                        <div className="text-center text-black animate__animated animate__fadeIn animate__delay-1s">
                            <img src="image/pngwing.com.png" alt="" width={280} className='ml-14' />
                            <h2 className="text-4xl font-bold mb-2 animate__fadeIn animate__delay-2s">
                                Your Cart is Empty
                            </h2>
                            <p className="text-black mb-4 text-lg animate__fadeIn animate__delay-3s">
                                Looks like you haven't added any items to your cart yet.
                            </p>
                            <Link to={"/"}
                                className="bg-yellow-500 text-gray-800 py-3 px-6 rounded-md hover:bg-yellow-600 transform hover:scale-105 transition-transform focus:outline-none focus:ring focus:border-yellow-300 animate__fadeIn animate__delay-4s"
                            >
                                Explore Products
                            </Link>
                        </div>
                        <style
                            dangerouslySetInnerHTML={{
                                __html:
                                    "\n        @keyframes fadeIn {\n            from {\n                opacity: 0;\n            }\n            to {\n                opacity: 1;\n            }\n        }\n\n        @keyframes bounceIn {\n            from,\n            20%,\n            40%,\n            60%,\n            80%,\n            to {\n                animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n            }\n\n            0% {\n                opacity: 0;\n                transform: scale3d(0.3, 0.3, 0.3);\n            }\n\n            20% {\n                transform: scale3d(1.1, 1.1, 1.1);\n            }\n\n            40% {\n                transform: scale3d(0.9, 0.9, 0.9);\n            }\n\n            60% {\n                opacity: 1;\n                transform: scale3d(1.03, 1.03, 1.03);\n            }\n\n            80% {\n                transform: scale3d(0.97, 0.97, 0.97);\n            }\n\n            to {\n                opacity: 1;\n                transform: scale3d(1, 1, 1);\n            }\n        }\n\n        .animate__animated {\n            animation-duration: 1s;\n            animation-fill-mode: both;\n        }\n\n        .animate__fadeIn {\n            animation-name: fadeIn;\n        }\n\n        .animate__bounceIn {\n            animation-name: bounceIn;\n        }\n    "
                            }}
                        />
                    </div>

                    :

                    <div className="bg-gray-100 p-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                                <h1 className="text-2xl font-bold flex items-center gap-1">Shopping Bag <BsBagCheckFill /> </h1>
                                <p className="text-sm text-gray-600">{cart.data?.length}  items in your bag.</p>


                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 ">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                                        <tr>
                                            <th className=" py-3">Sr no </th>
                                            <th className="px-4 py-3">Product </th>
                                            <th className="px-4 py-3">Product Name </th>
                                            <th className="px-4 py-3">Price</th>
                                            <th className="px-4 py-3">Quantity</th>
                                            <th className="px-4 py-3">Total</th>
                                            <th className="px-4 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>

                                        {
                                            cartProduct.map(
                                                (pro, i) => {
                                                    return (
                                                        <tr key={i} className=''>
                                                            <td>{i + 1}</td>

                                                            <td >
                                                                <img src={API_BASE_URL + productImageUrl + pro.image} alt=""
                                                                    className='mt-5'
                                                                    width={100}
                                                                    height={100}
                                                                // style={{ aspectRatio: "80 / 100", objectFit: "cover" }} 
                                                                />

                                                            </td>
                                                            <td>
                                                                <p className="uppercase text-xs text-gray-500">{pro?.category_id?.name}</p>
                                                                <p className="font-semibold">{pro?.name}</p>
                                                                <p className="text-xs text-gray-500">Color · {pro?.color?.name}</p>
                                                            </td>
                                                            <td className='py-2 px-2'>₹ {pro?.discount_price}</td>
                                                            <td className="flex items-center space-x-2">
                                                                <button onClick={() => {
                                                                    dispatcher(
                                                                        changeCartQty({
                                                                            pId: pro?._id,
                                                                            flag: false,
                                                                            price: pro.discount_price
                                                                        }))
                                                                    updateDbCart(pro._id, pro.qty - 1)
                                                                }}
                                                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"> -
                                                                </button>
                                                                <span>{pro.qty}</span>
                                                                <button
                                                                    onClick={() => {
                                                                        dispatcher(
                                                                            changeCartQty({
                                                                                pId: pro._id,
                                                                                flag: true,
                                                                                price: pro.discount_price
                                                                            })
                                                                        )
                                                                        updateDbCart(pro._id, pro.qty + 1)

                                                                    }}
                                                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"> +
                                                                </button>
                                                            </td>
                                                            <td className='py-2 px-2'>₹ {(pro.discount_price * pro.qty)}</td>

                                                            <td className='py-2 pl-2 '>
                                                                <IoIosCloseCircle onClick={
                                                                    () => {
                                                                        dispatcher(
                                                                            removeFromCart({
                                                                                pId: pro._id,
                                                                                total_price: pro.discount_price * pro.qty
                                                                            })
                                                                        )
                                                                        removeFromDbCart(pro._id);

                                                                    }} className='text-2xl text-red-600 cursor-pointer hover:text-red-400' />
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            )
                                        }


                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-96">
                                <h2 className="text-xl font-bold mb-4">Calculated Shipping</h2>
                                <button
                                    type="button"
                                    role="combobox"
                                    aria-controls="radix-:ri:"
                                    aria-expanded="false"
                                    aria-autocomplete="none"
                                    dir="ltr"
                                    data-state="closed"
                                    data-placeholder=""
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="country"
                                >
                                    <span style={{ pointerEvents: "none" }}>Country</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 opacity-50"
                                        aria-hidden="true"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>
                                <select
                                    aria-hidden="true"
                                    tabIndex={-1}
                                    style={{
                                        position: "absolute",
                                        border: 0,
                                        width: 1,
                                        height: 1,
                                        padding: 0,
                                        margin: "-1px",
                                        overflow: "hidden",
                                        clip: "rect(0px, 0px, 0px, 0px)",
                                        whiteSpace: "nowrap",
                                        overflowWrap: "normal"
                                    }}
                                >
                                    <option value="" />
                                </select>
                                <button
                                    type="button"
                                    role="combobox"
                                    aria-controls="radix-:rj:"
                                    aria-expanded="false"
                                    aria-autocomplete="none"
                                    dir="ltr"
                                    data-state="closed"
                                    data-placeholder=""
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="state"
                                >
                                    <span style={{ pointerEvents: "none" }}>State / City</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4 opacity-50"
                                        aria-hidden="true"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>
                                <select
                                    aria-hidden="true"
                                    tabIndex={-1}
                                    style={{
                                        position: "absolute",
                                        border: 0,
                                        width: 1,
                                        height: 1,
                                        padding: 0,
                                        margin: "-1px",
                                        overflow: "hidden",
                                        clip: "rect(0px, 0px, 0px, 0px)",
                                        whiteSpace: "nowrap",
                                        overflowWrap: "normal"
                                    }}
                                >
                                    <option value="" />
                                </select>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                                    placeholder="ZIP Code"
                                    type="text"
                                />
                                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-2">
                                    Update
                                </button>
                                <h2 className="text-xl font-bold mt-6 mb-4">Coupon Code</h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    Unlock exclusive savings with our limited-time coupon code, your key to accessing irresistible discounts on your favorite products!                        </p>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Coupon Code"
                                    type="text"
                                />
                                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-2">
                                    Apply
                                </button>
                                <div className="bg-yellow-200 p-4 rounded-lg mt-6">
                                    <h2 className="text-xl font-bold mb-2">Cart Total</h2>
                                    <div className="flex justify-between">
                                        <p>Cart Subtotal</p>
                                        <p>₹ {cart.total}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-500">Shipping</p>
                                        <p className="text-sm text-gray-500">Free</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Discount</p>
                                        <p>0.00</p>
                                    </div>
                                    <div className="flex justify-between font-bold">
                                        <p>Cart Total</p>
                                        <p>₹ {cart.total}</p>
                                    </div>
                                    <button onClick={checkout}
                                        className="inline-flex  hover:bg-slate-700 hover:text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-4">
                                        Check Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            }






        </div>
    );
}

export default Cart;
