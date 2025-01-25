const { Router } = require('express');
const MediController = require('../controller/MediController');
const fileUpload = require('express-fileupload');
const MediRouter = Router() ;


MediRouter.post(
    "/medi",
    fileUpload({
            createParentPath: true
    }) ,
    (req, res) => {
        const result = new MediController().create( req.body, req.files.image );
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

module.exports = MediRouter;