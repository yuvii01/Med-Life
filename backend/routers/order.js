const { Router } = require('express');
const OrderController = require('../controller/order');
const OrderRouter = Router();

OrderRouter.post(
    "/place-order",
    (req, res) => {
        const result = new OrderController().placeOrder(req.body);
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


OrderRouter.post(
    "/payment-success",
    (req, res) => {
        const result = new OrderController().paymentSuccess(req.body);
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


OrderRouter.post(
    "/payment-failed",
    (req, res) => {
        const result = new OrderController().paymentFailed(req.body);
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



OrderRouter.get(
    "/:id?",
    (req, res) => {
        // console.log(req.params.id)
        const result = new OrderController().thankyouOrder(req.params.id);
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

module.exports = OrderRouter;