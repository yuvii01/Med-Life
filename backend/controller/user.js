const { encryptPassword, decryptPassword } = require("../helper");
const User = require("../models/user");

class UserController {

    register(data, image) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    const existingUser = await User.findOne({ email: data.email });
                    if (existingUser) {
                        reject({
                            msg: "Email Already used",
                            status: 0
                        })
                    } else {
                        const imageName = new Date().getTime() + Math.floor(Math.random() * 1900) + image.name;
                        const destination = "./public/image/profile/" + imageName;

                        image.mv(
                            destination,
                            (error) => {
                                if (error) {
                                    reject({
                                        msg: "unable to upload image",
                                        status: 0
                                    })
                                } else {
                                    console.log("hello")
                                    const user = new User({
                                        name: data.name,
                                        email: data.email,
                                        password: encryptPassword(data.password),
                                        Image : imageName,
                                    });
                                    console.log("user ->",  user)
                                    user.save()
                                        .then(
                                            (success) => {
                                                resolve({
                                                    msg: "New User Added",
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

                        // const user = new User({
                        //     name: data.name,
                        //     email: data.email,
                        //     password: encryptPassword(data.password),
                        // })
                        // user.save()
                        //     .then(
                        //         (success) => {
                        //             resolve({
                        //                 msg: "User Added",
                        //                 status: 1,
                        //                 user
                        //             })
                        //         }
                        //     ).catch(
                        //         () => {
                        //             reject({
                        //                 msg: "Unable to add user",
                        //                 status: 0
                        //             })
                        //         }
                        //     )

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

    login(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    console.log("user is : " , data)
                    const user = await User.findOne({ email: data.email })
                    if (user) {
                        if (decryptPassword(user.password) == data.password) {
                            resolve({
                                msg: "Login succesfullyyyyy",
                                status: 1,
                                user
                            })
                        } else {
                            reject({
                                msg: "PassWord galat hai",
                                status: 0
                            })
                        }
                    } else {
                        reject({
                            msg: "This email does not exits",
                            status: 0
                        })
                    }
                } catch (error) {
                    () => {
                        reject({
                            msg: "Internal server error",
                            status: 0
                        })
                    }
                }

            }
        )
    }




}
module.exports = UserController;
