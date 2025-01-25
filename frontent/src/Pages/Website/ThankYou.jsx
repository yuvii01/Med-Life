
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../Context/MainContext';
import { useSelector } from 'react-redux';


const ThankYou = () => {
    const user = useSelector(store => store.user);

    const { order_id } = useParams();
    const { API_BASE_URL, CART_ORDER_URL } = useContext(Context);

    const [order, setOrder] = useState([]);

    const fetchOrder = () => {
        axios.get(API_BASE_URL + CART_ORDER_URL + `/${order_id}`)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setOrder(success.data.order);
                    } else {

                    }
                }
            ).catch(
                () => {

                }
            )
    }

    useEffect(
        () => {
            fetchOrder();
        }, []
    )

    return (
        <>


            {
                order && (
                    <div>
                        {console.log(order)}
                        <div className="bg-white p-8">
                            <div className="flex justify-between">
                                <div className="flex space-x-2 items-center">
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
                                        className="text-green-500 w-8 h-8"
                                    >
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    <div>
                                        <h1 className="text-xl font-bold">Order #{order._id}</h1>
                                        <h2 className="text-3xl font-bold">Thank You {user.data?.name}</h2>
                                    </div>
                                </div>
                                <img src="image/logo.svg.svg" alt="" className=' ' />
                            </div>
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold">Your Order is Confirmed</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    We have accepted your order, and we're getting it ready. A confirmation
                                    mail has been sent to {order.shipping_details?.email}
                                </p>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold">Customer Details</h4>
                                    <div className="mt-4">
                                        <div className="flex justify-between">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">Email</span>
                                                <span>{order.shipping_details?.email}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">Phone</span>
                                                <span>{order.shipping_details?.phone}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">Billing address</span>
                                                <span>{order.shipping_details?.first_name} {order.shipping_details?.last_name}</span>
                                                <span>{order.shipping_details?.Street} {order.shipping_details?.Locality} </span>
                                                <span>{order.shipping_details?.City}, {order.shipping_details?.State} {order.shipping_details?.pin} </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">Shipping address</span>
                                                <span>{order.shipping_details?.first_name} {order.shipping_details?.last_name}</span>
                                                <span>{order.shipping_details?.Street} {order.shipping_details?.Locality}</span>
                                                <span>{order.shipping_details?.City}, {order.shipping_details?.State} {order.shipping_details?.pin} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-6 rounded-lg">
                                    <h4 className="text-lg font-semibold">Order Details</h4>
                                    <div  className="flex flex-col mb-4">
                                                <div >
                                                    {/* <div className="flex justify-between px-4 items-center">
                                                        <img src={API_BASE_URL + productImageUrl + pro.image} width={100} height={64} alt='' />
                                                        <div className=" flex flex-col justify-center items-center text-sm ">
                                                            <div>{pro.name}</div>
                                                            <div className="font-medium">₹ {pro.discount_price} x {pro.qty}</div>
                                                        </div>
                                                    </div> */}
                                                </div>


                                            </div>
                                    <div className="mt-6">
                                        <div className="flex justify-between">
                                            <span className="text-sm">Subtotal</span>
                                            <span className="text-sm">₹ {order.order_total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* {
                order.map((odr, i) => (

                    <div key={i}>
                        {
                            console.log(odr)
                        }
                        Your order
                    </div>
                ))
            } */}

            {/* 
            */}
        </>

    );
}

export default ThankYou;
