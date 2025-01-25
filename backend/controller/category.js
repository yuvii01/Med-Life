const Category = require('../models/category');
const User = require('../models/category');
const { unlinkSync } = require("fs");
// const fileUpload = require('express-fileupload');

const { unlink } = require('../routers/category');

class CategoryController {

    create(data, image) {
        return new Promise((resolve, reject) => {
            try {
                const imageName = new Date().getTime() + Math.floor(Math.random() * 1900) + image.name;
                const destination = "./public/image/category/" + imageName;
                image.mv(
                    destination,
                    (error) => {
                        if (error) {
                            reject({
                                msg: "unable to upload data",
                                status: 0
                            })
                        } else {

                            const category = new Category({
                                name: data.name,
                                slug: data.slug,
                                image: imageName
                            });
                            category.save()
                                .then(
                                    (success) => {
                                        resolve({
                                            msg: "Category Added",
                                            status: 1
                                        })
                                    }
                                ).catch(
                                    () => {
                                        reject({
                                            msg: "Unable to add Category",
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
    
    read(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    let data = "";
                    if (id) {
                        data = await Category.findById(id);
                    } else {
                        data = await Category.find();

                    }
                    resolve(
                        {
                            msg: "Data found",
                            category: data,
                            status: 1,
                            imageBaseUrl: "/image/category/"
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

    
    delete(id, image_name) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    Category.deleteOne({ _id: id })
                        .then(
                            () => {
                                unlinkSync(`./public/image/category/${image_name}`)
                                resolve(
                                    {
                                        msg: "Data deleted",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (err) => {
                                console.log(err)
                                reject({
                                    msg: "Unable to delete",
                                    status: 0
                                })
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

    changeStatus(id, new_status) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    Category.updateOne(
                        { _id: id },
                        { status: new_status }
                    )
                        .then(
                            () => {
                                resolve(
                                    {
                                        msg: "Status Changed",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                reject({
                                    msg: "Unable to Change Status",
                                    status: 0
                                })
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


    update(id, data, image) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    if (image == null) {
                        Category.updateOne(
                            { _id: id },
                            { name: data.name, slug: data.slug }
                        ).then(
                            () => {
                                resolve(
                                    {
                                        msg: "Data updated",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                reject({
                                    msg: "Unable to update data",
                                    status: 0
                                })
                            }
                        )

                    }
                    else {
                        const imageName = new Date().getTime() + Math.floor(Math.random() * 1900) + image.name;
                        const destination = "./public/image/category/" + imageName;
                        image.mv(
                            destination,
                            (error) => {
                                if (!error) {
                                    Category.updateOne({ _id: id }, { name: data.name, slug: data.slug, image: imageName })
                                        .then(
                                            () => {
                                                unlinkSync(`./public/image/category/${data.old_name}`);
                                                resolve(
                                                    {
                                                        msg: "Data updated",
                                                        status: 1
                                                    }
                                                )
                                            }
                                        ).catch(
                                            () => {
                                                reject({
                                                    msg: "Unable to update data",
                                                    status: 0
                                                })
                                            }
                                        )

                                } else {
                                    reject({
                                        msg: "Unable to Update ",
                                        status: 0
                                    })
                                }
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
module.exports = CategoryController;