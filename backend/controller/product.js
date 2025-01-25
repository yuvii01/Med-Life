const Product = require("../models/product");
const Category = require("../models/category");
const Color = require("../models/color")
const { unlinkSync } = require("fs");
const mongoose = require('mongoose');
// const { unlink } = require('../routers/product');

class ProductController {

    create(data, image) {
        return new Promise((resolve, reject) => {
            try {
                const imageName = new Date().getTime() + Math.floor(Math.random() * 1900) + image.name;
                const destination = "./public/image/product/" + imageName;
                image.mv(
                    destination,
                    (error) => {
                        if (error) {
                            reject({
                                msg: "unable to upload data",
                                status: 0
                            })
                        } else {
                            const product = new Product({
                                name: data.name,
                                slug: data.slug,
                                price: data.price,
                                discount_percent: data.discount_percent,
                                discount_price: data.discount_price,
                                image: imageName,
                                category_id: data.category,
                                color: JSON.parse(data.color)
                            });
                            product.save()
                                .then(
                                    (success) => {
                                        resolve({
                                            msg: "Product Added",
                                            status: 1
                                        })
                                    }
                                ).catch(
                                    (error) => {
                                        console.log(error)
                                        reject({
                                            msg: "Unable to add product",
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

    read(id, query) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const dbQuery = {};
                    if (query.category_slug) {
                        const category = await Category.findOne({ slug: query.category_slug });
                        if (category != null) {
                            dbQuery.category_id = category._id
                        }
                    }


                    if (query.color_id != "null") {
                        const color = await Color.findById(query.color_id);
                        if (color != null) {
                            dbQuery.color = color._id;

                        }
                    }

                    let product = [];
                    if (id) {
                        product = await Product.findById(id).populate(['category_id ', 'color']);
                    } else {
                        if (query.limit != 0) {
                            product = await Product.find(dbQuery).populate(['category_id ', 'color']).limit(query.limit);

                        } else {
                            product = await Product.find(dbQuery).populate(['category_id ', 'color']);

                        }
                    }
                    resolve(
                        {
                            msg: "Product found",
                            product,
                            status: 1,
                            imageBaseUrl: "/image/product/"
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
                    Product.deleteOne({ _id: id })
                        .then(
                            () => {
                                // unlinkSync(`./public/image/product/${image_name}`)
                                resolve(
                                    {
                                        msg: "Data deleted",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error)
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

    update(id, data, image) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    if (image == null) {
                        Product.updateOne(
                            { _id: id },
                            {
                                name: data.name,
                                slug: data.slug,
                                price: data.price,
                                discount_percent: data.discount_percent,
                                discount_price: data.discount_price,
                                image: imageName,
                                category_id: data.category,
                                color: JSON.parse(data.color)
                            }
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
                        // const imageName = new Date().getTime() + Math.floor(Math.random() * 1900) + image.name;
                        // const destination = "./public/image/product/" + imageName;
                        // image.mv(
                        //     destination,
                        //     (error) => {
                        //         if (!error) {
                        //             Product.updateOne({ _id: id }, { name: data.name, slug: data.slug, image: imageName })
                        //                 .then(
                        //                     () => {
                        //                         unlinkSync(`./public/image/color/${data.old_name}`);
                        //                         resolve(
                        //                             {
                        //                                 msg: "Data updated",
                        //                                 status: 1
                        //                             }
                        //                         )
                        //                     }
                        //                 ).catch(
                        //                     () => {
                        //                         reject({
                        //                             msg: "Unable to update data",
                        //                             status: 0
                        //                         })
                        //                     }
                        //                 )

                        //         } else {
                        //             reject({
                        //                 msg: "Unable to Update ",
                        //                 status: 0
                        //             })
                        //         }
                        //     }
                        // )

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

    changeStatus(id, new_status) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    Product.updateOne(
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

}
module.exports = ProductController;