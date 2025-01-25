import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Context } from '../../../Context/MainContext';

const View = () => {
    const { productImageUrl, fetchProduct, products , openToast, API_BASE_URL, PRODUCT_BASE_URL } = useContext(Context);

    useEffect(
        () => {
            fetchProduct();
        }, []
    )
    const changeStatus = (id, new_status) => {
        axios.patch(API_BASE_URL + PRODUCT_BASE_URL + "/change-status/" + id + "/" + new_status)
            .then(
                (success) => {
                    if (success.data.status) {
                        openToast(success.data.msg, "success");
                        fetchProduct();
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

    const deleteData = (_id, image_name) => {
        axios.delete(API_BASE_URL + PRODUCT_BASE_URL + "/delete/" + _id + "/" + image_name).then(
            (success) => {
                if (success.data.status == 1) {
                    openToast(success.data.msg, "success");
                    fetchProduct();
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
    }
    

    return (

        <div>
            <div className='flex justify-between items-center text-3xl px-5 py-2'>
                <h1>Product Listing</h1>
                <Link to={"/admin/product/add"}>
                    <button type="button" className="text-white flex gap-1 items-center bg-gradient-to-br  from-pink-500 to-orange-400 hover:bg-gradient-to-bl  font-medium rounded-lg text-base	 px-3 py-2 text-center me-2 mb-2"><IoIosAdd />
                        Add</button>
                </Link>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                    <tr>
                        <th className='px-2 py-3'>Sr No</th>
                        <th className="px-4 py-3">Product Name</th>
                        <th className="px-4 py-3">Product Slug</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Final Price</th>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Color</th>
                        <th className="px-4 py-3">Action</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       products?.map(
                            (prod, index) => {
                                console.log(prod)
                                return (
                                    <tr key={index}>
                                        <td className='py-2 pl-5 px-2'>{index + 1}</td>
                                        <td className="py-2 px-2 ">{prod.name}</td>
                                        <td className="py-2 px-2">{prod.slug}</td>
                                        <td className="py-2 px-2">{prod.price}</td>
                                        <td className="py-2 px-2">{prod.discount_price}</td>
                                        <td className="py-2 px-2">
                                            {console.log("btade bkl" , productImageUrl)}
                                            <img className="w-24 " src={API_BASE_URL + productImageUrl + prod.image} alt="" />
                                        </td>
                                        <td className="py-2 px-2">
                                            {/* {prod.category_id._id} */}
                                            </td>
                                        <td className="py-2 px-2">{
                                            prod?.color?.map(
                                                (color) => {
                                                    return <span className='mb-1 block'>{color.name}</span>
                                                }
                                            )
                                        }</td>
                                        <td className="py-2 px-2">
                                            <div className='flex text-xl gap-4'>
                                                <MdDelete onClick={() => deleteData(prod._id)} className=' cursor-pointer hover:text-[red]  ' />
                                                <Link to={"/admin/product/edit/" + prod._id}>
                                                    <MdEdit className=' cursor-pointer hover:text-lime-500	  ' />
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4">
                                            {
                                                prod.status == true ?
                                                    <button onClick={() => changeStatus(prod._id, false)} className=" text-white font-medium rounded-lg text-sm px-2 py-1 bg-lime-500">Active</button> :
                                                    <button onClick={() => changeStatus(prod._id, true)} className=" text-white font-medium rounded-lg text-sm px-2 py-1 bg-red-500">Inactive</button>
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>


        </div>
    );
}

export default View;
