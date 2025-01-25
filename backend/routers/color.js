const { Router } = require('express');
const ColorController = require('../controller/color');
const ColorRouter = Router();

ColorRouter.post(
    "/create",
    (req, res) => {
        const result = new ColorController().create(req.body);
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

ColorRouter.get(
    "/:id?",
    (req, res) => {
        const result = new ColorController().read(req.params.id);
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

ColorRouter.patch(
    "/change-status/:id/:new_status",
    (req, res) => {
        const result = new ColorController().changeStatus(req.params.id, req.params.new_status);
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
ColorRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new ColorController().delete(req.params.id);
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
ColorRouter.put(
    "/update/:id",
    (req, res) => {

        const result = new ColorController().update(req.params.id, req.body);
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

module.exports = ColorRouter;