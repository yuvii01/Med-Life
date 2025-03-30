import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/MainContext';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Reducers/UserSlice';
import { FileUploader } from 'react-drag-drop-files';
import { dbToCart } from '../../Reducers/cartSlice';

const Signup = () => {
    const { API_BASE_URL, USER_BASE_URL, openToast ,CART_BASE_URL } = useContext(Context);
    const [passwordStrength, setPasswordStrength] = useState('');
    const cart = useSelector(store => store.cart);
    const [passwordColor, setPasswordColor] = useState('');
    const [file, setFile] = useState(null);
    const navigator = useNavigate();
    const dispatcher = useDispatch();

    const signupHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('email', e.target.email.value);
        formData.append('password', e.target.password.value);
        formData.append('contactNumber', e.target.contactNumber.value);
        formData.append('gender', e.target.gender.value);
        formData.append('age', e.target.age.value);
        formData.append('guardian_contactNo', e.target.guardianContact.value);
        formData.append('Disease', e.target.disease.value);
        formData.append('address', e.target.address.value);
        // address.forEach((addr, index) => formData.append(`address[${index}]`, addr));
        if (file) formData.append('image', file);

        axios.post(API_BASE_URL + USER_BASE_URL + '/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((success) => {
                if (success.data.status === 1) {
                    openToast(success.data.msg, "success");
                                            dispatcher(
                                                login({
                                                    user: success.data.user,
                                                })
                                            );
                                            console.log(success.data)
                                            stateToCart(success.data.user._id);
                                            navigator("/");
                } else {
                    console.log("idhr aar h bc yh toh")
                    openToast(success.data.msg, 'error');
                }
            })
            .catch((error) => {
                console.error(error);
                console.log("idhr aara h")
                openToast('Client-side error', 'error');
            });
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



    const handlePasswordChange = (e) => {
        const password = e.target.value;
        if (password.length < 6) {
            setPasswordStrength('Password is too weak');
            setPasswordColor('text-red-500');
        } else if (password.length < 10) {
            setPasswordStrength('Password is moderate');
            setPasswordColor('text-yellow-500');
        } else {
            setPasswordStrength('Password is strong');
            setPasswordColor('text-green-500');
        }
    };

    const handleChange = (file) => {
        setFile(file);
    };

    const removeHandler = () => {
        setFile(null);
    };

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                       className="mx-auto h-[100px] w-auto"
                        src="logo.jpeg"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={signupHandler} className="space-y-6" encType="multipart/form-data">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                required
                                className="block w-full rounded-md border px-2 py-1.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="block w-full rounded-md border px-2 py-1.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                onChange={handlePasswordChange}
                                className="block w-full rounded-md border px-2 py-1.5"
                            />
                            <span className={`text-sm ${passwordColor}`}>{passwordStrength}</span>
                        </div>
                        <div>
                            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-900">
                                Contact Number
                            </label>
                            <input
                                id="contactNumber"
                                name="contactNumber"
                                type="text"
                                placeholder="Enter your contact number"
                                className="block w-full rounded-md border px-2 py-1.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-900">
                                Gender
                            </label>
                            <select id="gender" name="gender" className="block w-full rounded-md border px-2 py-1.5">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Age
                            </label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                placeholder="Enter your Age"
                                required
                                className="block w-full rounded-md border px-2 py-1.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="guardianContact" className="block text-sm font-medium text-gray-900">
                                Guardian's Contact Number
                            </label>
                            <input
                                id="guardianContact"
                                name="guardianContact"
                                type="text"
                                placeholder="Enter guardian's contact number"
                                required
                                className="block w-full rounded-md border px-2 py-1.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="disease" className="block text-sm font-medium text-gray-900">
                                Disease (Any Mojor)
                            </label>
                            <input
                                id="disease"
                                name="disease"
                                type="text"
                                placeholder="Enter disease (if any)"
                                className="block w-full rounded-md border px-2 py-1.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-900">
                                Adress
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Enter your Address "
                                className="block w-full rounded-md border px-2 py-1.5"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900">Profile Image</label>
                            <FileUploader handleChange={handleChange} name="file" />
                            {file && (
                                <div className="flex items-center gap-2 mt-2">
                                    <span>{file.name}</span>
                                    <button
                                        type="button"
                                        onClick={removeHandler}
                                        className="text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white rounded-md py-1.5"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-sm text-center mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
