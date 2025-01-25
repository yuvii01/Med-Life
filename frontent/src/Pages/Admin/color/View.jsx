import React, { useContext, useEffect } from 'react';
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { Context } from '../../../Context/MainContext';
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const View = () => {

    const { colors, fetchColor, openToast, API_BASE_URL,  COLOR_BASE_URL } = useContext(Context);

    useEffect(
        () => {
            fetchColor();     
        }, []
    )

    const changeStatus = (id, new_status) => {
        axios.patch(API_BASE_URL + COLOR_BASE_URL + "/change-status/" + id + "/" + new_status)
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
    const deleteData = (_id) => {
        axios.delete(API_BASE_URL + COLOR_BASE_URL + "/delete/" + _id).then(
            (success) => {
                if (success.data.status == 1) {
                    openToast(success.data.msg, "success");
                    fetchColor();     
                } else {
                    openToast(success.data.msg, "error")
                }
            }
        ).catch(
            () => {
                openToast("Client side error", "error")
            }
        )
    }

    return (
        <div>
            <div className='flex justify-between items-center text-3xl px-5 py-2'>
                <h1>Color Listing</h1>
                <Link to={"/admin/color/add"}>
                    <button type="button" className="text-white flex gap-1 items-center bg-gradient-to-br  from-pink-500 to-orange-400 hover:bg-gradient-to-bl  font-medium rounded-lg text-base	 px-3 py-2 text-center me-2 mb-2"><IoIosAdd />
                        Add</button>
                </Link>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            colors.map(
                                (color, index) => {
                                    return (
                                        <tr key={color._id} className="bg-white border-b  dark:border-gray-700">
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {color.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                <span className='px-6' style={{ background: color.code }}></span>
                                            </td>
                                            <td className="px-6 py-4">{
                                                color.status == true ?
                                                    <button onClick={() => changeStatus(color._id, false)} className=" text-white font-medium rounded-lg text-sm px-2 py-1 bg-lime-500">Active</button> :
                                                    <button onClick={() => changeStatus(color._id, true)} className=" text-white font-medium rounded-lg text-sm px-2 py-1 bg-red-500">Inactive</button>
                                            }</td>
                                            <td className="px-6 py-4">
                                                <div className='flex text-xl gap-4'>
                                                    <MdDelete onClick={() => deleteData(color._id)} className=' cursor-pointer hover:text-[red]  ' />
                                                    <Link to={"/admin/color/edit/" + color._id}>
                                                    <MdEdit  className=' cursor-pointer hover:text-lime-500	  ' />
                                               </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default View;
