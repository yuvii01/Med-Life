const { Router } = require('express');
const UserController = require('../controller/user');
const UserRouter = Router();
const fileUpload = require('express-fileupload');

UserRouter.post(
    
    "/register",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        const result = new UserController().register(req.body, req.files.image);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                console.log("route m error")
                res.send(error);
            })
    }
)

UserRouter.post(
    "/login",
    fileUpload({
        createParentPath: true
    }),
    (req, res) => {
        console.log(req.body)
        const result = new UserController().login(req.body);
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )

    }
)


module.exports = UserRouter;