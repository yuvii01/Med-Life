import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../Context/MainContext';
import axios from 'axios';

const Edit = () => {
    const { id } = useParams();
    const { API_BASE_URL, COLOR_BASE_URL, openToast, fetchColor } = useContext(Context);
    const [color, setColor] = useState(null);


    const formSubmitHandler = (event) => {
        const name = event.target.name.value;
        const color = event.target.color.value;
        axios.patch(API_BASE_URL + COLOR_BASE_URL + "/update/", { name, color })
            .then(
                (success) => {
                    if (success.data.status) {
                        openToast(success.data.msg, "success");
                        fetchColor();
                    } else {
                        openToast(success.data.msg, "error")
                    }
                }
            ).catch(
                (error) => {
                    openToast(error.message, "error")
                }
            )


    }

    useEffect(
        () => {
            if (id != undefined) {
                // console.log(API_BASE_URL + COLOR_BASE_URL + "/" + id)
                axios.get(API_BASE_URL + COLOR_BASE_URL + "/" + id)
                    .then(
                        (success) => {
                            //    console.log(success.data.status)
                            if (success.data.status) {
                                setColor(success.data.colors)
                                console.log("hyy")


                            } else {
                                openToast(success.data.msg, "error")
                            }
                        }
                    ).catch(
                        (error) => {

                        }
                    )
            } else {

            }
        },
        []
    )

    return (
        <div>
            <div className=' mx-auto bg-white shadow  rounded-xl'>
                <div className='flex justify-between items-center text-3xl px-5 py-2'>
                    <h1>Edit Color</h1>

                </div><hr />
                <form onSubmit={formSubmitHandler} className='p-4' >
                    <div className=' grid grid-cols-2'>
                        <div className="mb-8 mt-5">
                            <label htmlFor="name" className=" block text-gray-700 font-bold mb-2">
                                Color Name
                            </label>
                            <input
                                onChange={(e) => {
                                    setColor({ ...color, name: e.target.value })
                                    // console.log(e.target.value)
                                }}
                                value={color?.name}
                                placeholder='  Enter Color'
                                type="text"
                                id="name"
                                name="name"
                                className="border-2 border-black  w-[50%] rounded-md"
                            />
                        </div>
                        <div className="mb-8 mt-5">
                            <label htmlFor="color" className=" block text-gray-700 font-bold mb-2">
                                Color
                            </label>
                            <input
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setColor({ ...color, code: e.target.value })
                                }}
                                value={color?.code}

                                type="color"
                                id="color"
                                name="color"
                                className="w-[50%] rounded-md border-2 border-black"
                            />
                        </div>
                    </div>

                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
