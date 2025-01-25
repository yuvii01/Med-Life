const Color = require("../models/color");

class ColorController {

    create(data) {
        return new Promise((resolve, reject) => {
            try {
                const color = new Color({
                    name: data.name,
                    code: data.color,
                });
                color.save()
                    .then(
                        (success) => {
                            resolve({
                                msg: "color Add",
                                status: 1,
                            })
                        }
                    ).catch(
                        () => {
                            reject({
                                msg: "Unable to add color",
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

    read(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    let colors = [];
                    if (id) {
                        colors = await Color.findById(id);
                    } else {
                        colors = await Color.find();
                    }
                    resolve(
                        {
                            msg: "Color found",
                            colors,
                            status: 1,
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

    delete(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    Color.deleteOne({
                         _id: id
                         })
                        .then(
                            () => {
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
                    Color.updateOne(
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

    update(id, data) {
        return new Promise(
            (resolve, reject) => {
                try {
                    Color.updateOne(
                        { _id: id },
                        { name: data.name, color: data.code }
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
                catch (error) {
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
module.exports = ColorController;