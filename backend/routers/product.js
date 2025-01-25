const { Router } = require('express');
const ProductController = require('../controller/product');
const ProductRouter = Router();
const fileUpload = require('express-fileupload');


ProductRouter.post(
    "/create",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const result = new ProductController().create(req.body, req.files.image);
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

ProductRouter.get(
    "/:id?",
    (req, res) => {
        const result = new ProductController().read(req.params.id, req.query);
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
ProductRouter.delete(
    "/delete/:id/:image_name",
    (req, res) => {
        const result = new ProductController().delete(req.params.id, req.params.image_name);
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


ProductRouter.patch(
    "/change-status/:id/:new_status",
    (req, res) => {
        const result = new ProductController().changeStatus(req.params.id, req.params.new_status);
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
ProductRouter.put(
    "/update/:id",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        let image = null
        if (req.files?.image) {
            image = req.files.image;
        }
        const result = new ProductController().update(req.params.id, req.body, image);
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
module.exports = ProductRouter;