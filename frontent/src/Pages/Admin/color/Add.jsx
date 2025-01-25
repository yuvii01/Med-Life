import React, { useContext, } from 'react';
import { Context } from '../../../Context/MainContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Add = () => {
    const { API_BASE_URL, COLOR_BASE_URL, openToast } = useContext(Context);

    const navigator = useNavigate();


    const formSubmitHandler = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const color = event.target.color.value;
        if (name != "" && color != "") {
            // openToast("data submit", "success")
            axios.post(API_BASE_URL + COLOR_BASE_URL + "/create", { name, color })
                .then(
                    (success) => {
                        if (success.data.status == 1) {
                            // event.target.reset();
                            openToast(success.data.msg, "success");
                            navigator("/admin/color");
                        } else {
                            openToast(success.data.msg, "error")
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error)
                        openToast("Client side error", "error")
                    }
                )
        } else {
            openToast("Please enter the data", "error")
        }
    }




    return (
        <div>
            <div className=' mx-auto bg-white shadow  rounded-xl'>
                <div className='flex justify-between items-center text-3xl px-5 py-2'>
                    <h1>Add Color</h1>

                </div><hr />
                <form onSubmit={formSubmitHandler} className='p-4' >
                    <div className=' grid grid-cols-2'>
                        <div className="mb-8 mt-5">
                            <label htmlFor="name" className=" block text-gray-700 font-bold mb-2">
                                Color Name
                            </label>
                            <input

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

export default Add;
