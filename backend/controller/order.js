const Order = require("../models/order");
const Cart = require("../models/cart");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Transaction = require("../models/transaction");


var instance = new Razorpay({
    key_id: 'rzp_test_vNoztmT3ky59rZ',
    key_secret: 'gKe4sYCv34witrbNBPRh7FY5',
});



class OrderController {

    generateSignature(orderId, paymentId, secret) {
        const message = orderId + "|" + paymentId;
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(message);
        return hmac.digest('hex');
    }

    //  to verify signature
    verifySignature(orderId, paymentId, receivedSignature, secret = "gKe4sYCv34witrbNBPRh7FY5") {
        const generatedSignature = this.generateSignature(orderId, paymentId, secret);
        return generatedSignature == receivedSignature;
    }




    placeOrder({ user_id, shipping_details, order_total, payment_mode, product_details }) {
        return new Promise(
            async (res, rej) => {
                try {
                    const order = new Order({
                        user_id, shipping_details, order_total, payment_mode, product_details
                    })
                    order.save()
                        .then(
                            async (success) => {
                                if (payment_mode == 2) {
                                    var options = {
                                        amount: order_total * 100,  // amount in the smallest currency unit
                                        currency: "INR",
                                        receipt: order._id,
                                    };
                                    instance.orders.create(options,
                                        async function (err, razor_order) {
                                            console.log(err)
                                            if (err) {
                                                rej({
                                                    msg: "Unable to place Order",
                                                    status: 0
                                                })
                                            } else {
                                                await Cart.deleteMany(
                                                    { user_id: user_id }
                                                )
                                                res({
                                                    order_id: order._id,
                                                    msg: "Your Order Placed  online",
                                                    status: 1,
                                                    razor_order
                                                })
                                            }
                                        });

                                } else {
                                    await Cart.deleteMany(
                                        { user_id: user_id }
                                    )
                                    res({
                                        order_id: order._id,
                                        msg: "Your Order Placed through offline",
                                        status: 1
                                    })
                                }
                            }
                        ).catch(
                            (error) => {
                                console.log(error)

                                rej({
                                    order_id: null,
                                    msg: "Unable to place Order",
                                    status: 0
                                })
                            }
                        )
                } catch (error) {
                    console.log(error)
                    rej({

                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    paymentSuccess({ order_id, razorpay_response = null }) {
        return new Promise(
            async (res, rej) => {
                try {
                    const verified = this.verifySignature(razorpay_response.razorpay_order_id, razorpay_response.razorpay_payment_id, razorpay_response.razorpay_signature);
                    if (verified) {

                        const orderDetails = await Order.findById(order_id);
                        const transaction = new Transaction({
                            orderId: order_id,
                            userId: orderDetails.user_id,
                            amount: orderDetails.order_total,
                            type: orderDetails.payment_mode,
                            payment_status: 1,
                            razorpayResponse: razorpay_response
                        })
                        transaction.save()
                            .then(
                                async () => {
                                    await Order.updateOne({ _id: order_id },
                                        {
                                            transaction_id: transaction._id,
                                            order_status: 2
                                        })
                                    res({
                                        msg: "Order Place through online ",
                                        status: 1,
                                        order_id
                                    })
                                }
                            ).catch(
                                () => {
                                    rej({
                                        msg: "Unable to place order",
                                        status: 0
                                    })
                                }
                            )
                    } else {
                        rej({
                            msg: "Farzi Payment",
                            status: 0
                        })
                    }
                } catch (error) {
                    console.log(error)
                    rej({

                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    paymentFailed({ order_id, razorpay_response }) {
        return new Promise(
            async (res, rej) => {
                try {
                    const orderDetails = await Order.findById(order_id);
                    const transaction = new Transaction({
                        orderId: order_id,
                        userId: orderDetails.user_id,
                        amount: orderDetails.order_total,
                        type: orderDetails.payment_mode,
                        payment_status: 0,
                        razorpayResponse: razorpay_response
                    })
                    transaction.save()
                        .then(
                            () => {

                                res({
                                    msg: "Order Payment Failed",
                                    status: 0,
                                    order_id
                                })
                            }
                        ).catch(
                            () => {
                                rej({
                                    msg: "Unable to place order",
                                    status: 0
                                })
                            }
                        )


                } catch (error) {
                    console.log(error)
                    rej({

                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }



    thankyouOrder(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    // console.log("first", id)
                    if (id) {
                        // console.log( id)
                       const order = await Order.findById(id);
                        // console.log(order)
                        resolve(
                            {
                                msg: "order found",
                                status: 1,
                                order
                            }
                        )
                    }
                } catch (error) {
                    () => {
                        reject({
                            msg: "Internal server error",
                            status: 0
                        })
                    }
                }
            })
    }

}

module.exports = OrderController;