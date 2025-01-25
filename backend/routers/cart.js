const { Router } = require('express');
const CartController = require('../controller/cart');
const CartRouter = Router();

CartRouter.post(
    "/state-to-cart/:user_id",
    (req, res) => {
        const result = new CartController().stateToCart(req.params.user_id, req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);

            })
    }
)

CartRouter.put(
    "/change-quantity",
    (req, res) => {
        const result = new CartController().changeQty(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);

            })
    }
)



CartRouter.post(
    "/add-to-cart",
    (req, res) => {
        const result = new CartController().addToCart(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);

            })
    }
)
CartRouter.post(
    "/remove-from-cart",
    (req, res) => {
        const result = new CartController().removeFromCart(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);

            })
    }
)

module.exports = CartRouter;