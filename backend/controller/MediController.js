const Cart = require("../models/medi.js");

class CartController {

    changeQty({ user_id, pId, newCart }) {
        return new Promise(
            async (res, rej) => {
                try {
                    await Cart.updateOne({ user_id: user_id, pId: pId }, { qty: newQty });
                    res({
                        msg: "QTY Changed",
                        status: 1
                    })
                } catch (error) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    stateToCart(user_id, { state_cart }) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    // Iterate over each item in state_cart
                    for (let sc of state_cart) {
                        // Check if the item already exists in the user's cart
                        const existingCart = await Cart.findOne({ pId: sc.pId, user_id: user_id })
                        if (existingCart) {
                            // If exists, update the quantity
                            await Cart.updateOne(
                                { _id: existingCart._id },
                                { qty: sc.qty + existingCart.qty }
                            )
                        } else {
                            // If not exists, add a new item to the cart
                            await new Cart({ pId: sc.pId, qty: sc.qty, user_id: user_id }).save();
                        }
                    }
                    // Retrieve the user's cart with product details populated
                    const userCart = await Cart.find({ user_id: user_id }).populate("pId");
                    // Resolve with success message and the user's cart
                    resolve({
                        msg: "success",
                        status: 1,
                        userCart
                    })
                } catch (error) {
                    // If any error occurs, reject with an error message
                    reject({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    addToCart(user_id, pId,) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const currentCart = await Cart.findOne({ user_id: user_id, pId: pId })
                    if (currentCart) {
                        await Cart.updateOne({ _id: currentCart._id }, { qty: currentCart.qty + 1 })
                    } else {
                        const cart = new Cart({ user_id: user_id, pId: pId, qty: 1 })
                        cart.save().then(
                            (success) => {
                                resolve({
                                    msg: "Added to Cart",
                                    status: 1,

                                })
                            }
                        ).catch(
                            () => {
                                reject({
                                    msg: "UNABLE Add to Cart",
                                    status: 0,

                                })
                            }
                        )
                    }
                    resolve({
                        msg: "success",
                        status: 1,
                        userCart
                    })
                } catch (error) {
                    reject({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    removeFromCart(user_id, pId,) {
        
        return new Promise(
            async (resolve, reject) => {
                try {
                    Cart.deleteOne({ user_id: user_id, pId: pId })
                        .then(
                            (success) => {
                                resolve({
                                    msg: "Deleted product",
                                    status: 1,

                                })
                            }
                        ).catch(
                            () => {
                                reject({
                                    msg: "unable delete to product",
                                    status: 0,

                                })
                            }
                        )
                } catch (error) {
                    reject({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    create(data, image) {

        return new Promise((resolve, reject) => {
            try {
                const imageName = new Date().getTime() + Math.floor(Math.random() * 1900) + image.name;
                const destination = "./public/image/medi/" + imageName;
                image.mv (
                    destination ,
                    (error) => {
                        if (error) {
                            reject({
                                msg: "unable to upload data",
                                status: 0
                            })
                        } else {
                            const product = new Cart ({
                                name: data.name,
                                qty: data.qty,
                                date: data.date,
                                timing: data.timing,
                                image: imageName
                            }) ;
                            product.save()
                                .then(
                                    (success) => {
                                        resolve({
                                            msg: "Medicine Added",
                                            status: 1
                                        })
                                    }
                                ).catch(
                                    (error) => {
                                        console.log(error)
                                        reject({
                                            msg: " Unable to add Medicine ",
                                            status: 0
                                        })
                                    }
                                )
                        }
                    }
                )

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
module.exports = CartController;