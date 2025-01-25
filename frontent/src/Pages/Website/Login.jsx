import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/MainContext';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login } from '../../Reducers/UserSlice';
import { dbToCart } from '../../Reducers/cartSlice';
import { FileUploader } from 'react-drag-drop-files';

const Login = () => {
    const { API_BASE_URL, USER_BASE_URL, openToast, CART_BASE_URL } = useContext(Context);

    const cart = useSelector(store => store.cart);
    const [file, setFile] = useState(null);

    const navigator = useNavigate();
    const dispatcher = useDispatch();


    const loginHandler = (e) => {
        e.preventDefault();

    const data = new FormData();
    data.append('email', e.target.email.value);
    data.append('password', e.target.password.value);

    console.log(e.target.email.value, e.target.password.value);

    // Post the FormData to the server
    axios.post(API_BASE_URL + USER_BASE_URL + "/login", data , {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    })
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        openToast(success.data.msg, "success");
                        dispatcher(
                            login({
                                user: success.data.user,
                            })
                        );
                        stateToCart(success.data.user._id);
                        navigator("/");
                    } else {
                        openToast(success.data.msg, "error");
                    }
                }
            ).catch(
                (error) => {
                    console.log(error);
                    openToast("Client side error", "error");
                }
            );
    };

    const stateToCart = (userId) => {
        axios.post(API_BASE_URL + CART_BASE_URL + "/state-to-cart/" + userId, { state_cart: cart.data })
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        let total = 0;
                        const cartData = success.data.userCart.map(
                            (c) => {
                                total += (c.pId.discount_price * c.qty);
                                return {
                                    pId: c.pId._id,
                                    qty: c.qty
                                };
                            }
                        );
                        dispatcher(dbToCart({ data: cartData, total }));
                    }
                }
            ).catch(
                (error) => {
                    console.log(error);
                    openToast("Client side error", "error");
                }
            );
    };

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="image/logo.svg.svg"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={loginHandler} className="space-y-6" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="text-sm">
                            <p className="font-semibold text-right text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </p>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="text-sm font-medium text-gray-900 my-8">
                        Don’t have an account yet? <Link to={'/sign-up'} className='font-semibold text-indigo-600'>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
