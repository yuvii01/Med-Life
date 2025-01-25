import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../Context/MainContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../../Reducers/cartSlice';
import useRazorpay from 'react-razorpay'


const Checkout = () => {
    const [Razorpay] = useRazorpay();
    const { products, productImageUrl, API_BASE_URL, fetchProduct, CART_ORDER_URL } = useContext(Context);
    const user = useSelector(store => store.user);
    const cart = useSelector(store => store.cart);
    const navigator = useNavigate();
    const dispatcher = useDispatch();

    const [cartProduct, setCartProduct] = useState([]);

    useEffect(
        () => {
            fetchProduct()
        }, []
    )


    useEffect(
        () => {
            const data = [];
            for (let p of products) {
                for (let c of cart.data) {
                    if (c.pId == p._id) {
                        data.push(
                            {
                                ...c,
                                ...p
                            }
                        )
                    }
                }
            }
            setCartProduct(data);
        }, [cart, products]
    )

    const deatailsFormHandler = (e) => {
        e.preventDefault();
        const shipping_details = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            Street: e.target.Street.value,
            Locality: e.target.Locality.value,
            City: e.target.City.value,
            State: e.target.State.value,
            pin: e.target.pin.value,
            phone: e.target.phone.value,
            email: e.target.email.value,

        }
        const payment_mode = parseInt(e.target.radio_option.value);
        const order_total = cart.total + (payment_mode == 1 ? 50 : 0);
        axios.post(API_BASE_URL + CART_ORDER_URL + "/place-order",
            {
                user_id: user.data,
                shipping_details,
                order_total,
                payment_mode,
                product_details: (cartProduct),
            })
            .then(
                (success) => {
                    if (success.data.status == 1) {

                        if (payment_mode == 1) {
                            dispatcher(emptyCart())
                            // const order = success.data.order_id;
                            // + {order}
                            navigator("/thank-you/" + success.data.order_id)
                        } else {
                            initRazorpayOrder(
                                success.data.order_id,
                                order_total,
                                success.data.razor_order.id,
                                shipping_details
                            )
                        }
                    }
                }
            ).catch(
                (error) => {
                }
            )
    }

    const initRazorpayOrder = (
        order_id, amount, razorpay_order_id, userData) => {

        const options = {
            key: "rzp_test_vNoztmT3ky59rZ", // Enter the Key ID generated from the Dashboard
            amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "IShop",
            description: "HELLO THIS IS ISHOP RAZORPAY ",
            image: "http://localhost:3000/image/logo.svg.svg",
            order_id: razorpay_order_id,
            //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().

            handler: function (razorpay_response) {
                axios.post(API_BASE_URL + CART_ORDER_URL + "/payment-success", { order_id, razorpay_response })
                    .then(
                        (success) => {
                            if (success.data.status == 1) {
                                dispatcher(emptyCart())
                                navigator("/thank-you/" + success.data.order_id)
                            } else {

                            }
                        }
                    ).catch(
                        (error) => {
                        }
                    )
            },
            prefill: {
                name: userData.name,
                email: userData.email,
                contact: userData.phone,
            },

            theme: {
                color: "#FF4252",
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {

            const razorpay_response = {
                razorpay_order_id: response.error.metadata.order_id,
                razorpay_payment_id: response.error.metadata.payment_id,
            }

            axios.post(API_BASE_URL + CART_ORDER_URL + "/failed", { order_id, razorpay_response })
                .then(
                    (success) => {
                        if (success.data.status == 1) {
                            navigator("/Failed")

                        } else {

                        }
                    }
                ).catch(
                    (error) => {
                    }
                )
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
        });

        rzp1.open();

    }

    
    return (
        <div className='max-w-[1280px]  mx-auto'>
            <div className="bg-white p-8">
                <div className="  mb-4">
                    <div className="grid grid-cols-6  gap-9 ">
                        <div className="col-span-4  ">
                            <div className="max-w-[100%] mx-auto p-4">
                                <h2 className="text-xl font-semibold mb-6">Your Details:</h2>
                                <form onSubmit={deatailsFormHandler} className="space-y-4">
                                    <div>
                                        <label htmlFor="full-name" className="block text-sm font-medium mb-1">
                                            Full Name
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="First Name"
                                                type="text"
                                                required
                                                name='first_name'
                                                defaultValue={user.data?.name}
                                            />
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Last Name"

                                                type="text"
                                                required
                                                name='last_name'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="address">
                                            Address
                                        </label>
                                        <div className='grid grid-cols-2 gap-4 mt-2'>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Floor no / Street Address"
                                                type="text"
                                                defaultValue={user.data?.street}

                                                required
                                                name='Street'

                                            />
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Locality / Area"
                                                type="text"
                                                required
                                                name='Locality'
                                                defaultValue={user.data?.locality}
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="City"
                                                type="text"
                                                required
                                                name='City'
                                                defaultValue={user.data?.city}


                                            />
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="State "
                                                type="text"
                                                required
                                                name='State'
                                            />
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="PIN Code"
                                                type="number"
                                                name='pin'
                                                required
                                                defaultValue={user.data?.pin}

                                                minLength={6}  // Minimum length set to 6 digits
                                                maxLength={8}  // Maximum length set to 8 digits
                                            />
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-1"
                                                htmlFor="phone-number"
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="9876543219"
                                                required
                                                defaultValue={user.data?.phone}

                                                name='phone'
                                                type='number'
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1" htmlFor="email">
                                                E-mail
                                            </label>
                                            <input
                                                required
                                                defaultValue={user.data?.email}

                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="ex: email@yahoo.com"
                                                type="email"
                                                name='email'
                                            /></div>
                                    </div>
                                    <div>
                                        <h2 className="block text-sm font-medium py-2" >
                                            Mode of Payment
                                        </h2>
                                        <div className="max-w-xs flex gap-10">
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold " htmlFor="option1">
                                                    <input
                                                        className="mr-2 max-w-[60px] leading-tight"
                                                        type="radio"
                                                        id="option1"
                                                        name="radio_option"
                                                        defaultValue="1"
                                                    />
                                                    <span className="text-sm">COD (₹ + 50 Extra)</span>
                                                </label>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold " htmlFor="option2">
                                                    <input
                                                        className="mr-2 max-w-[60px] leading-tight"
                                                        type="radio"
                                                        id="option2"
                                                        name="radio_option"
                                                        defaultValue="2"
                                                        defaultChecked

                                                    />
                                                    <span className="text-sm">Online</span>
                                                </label>
                                            </div>
                                        </div>

                                    </div>

                                    <button
                                        className=" bg-zinc-700 text-white hover:bg-yellow-200 hover:text-black rounded-md text-sm font-medium   px-4 py-2"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className=' col-span-2 '>
                            <h2 className="text-xl font-semibold mb-4">YOUR CART</h2>

                            {
                                cartProduct.map(
                                    (pro, i) => {
                                        return (
                                            <div key={i} className="flex flex-col mb-4">
                                                <div >
                                                    <div className="flex justify-between px-4 items-center">
                                                        <img src={API_BASE_URL + productImageUrl + pro.image} width={100} height={64} alt='' />
                                                        <div className=" flex flex-col justify-center items-center text-sm ">
                                                            <div>{pro.name}</div>
                                                            <div className="font-medium">₹ {pro.discount_price} x {pro.qty}</div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        )
                                    }
                                )
                            }
                            <div className="text-sm">
                                <div className="flex justify-between mb-1">
                                    <span>Item Subtotal</span>
                                    <span>₹ {cart.total}</span>
                                </div>

                                <div className="flex justify-between mb-1">
                                    <span>Shipping</span>
                                    <span>₹ 0,00 </span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>₹ {cart.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Checkout;
