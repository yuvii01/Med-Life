import React, { useContext, useRef, useState } from 'react';
import { IoIosAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { Context } from '../../../Context/MainContext';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const View = () => {
    const [toggle, setToggle] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const { openToast, category, categoryImageUrl, fetchCategory, API_BASE_URL, CATEGORY_BASE_URL } = useContext(Context);



    const nameRef = useRef();
    const slugRef = useRef();
    const categoryIdRef = useRef();
    const oldNameRef = useRef();


    const titleToslug = () => {
        console.log(nameRef.current.value)
        const slug = nameRef.current.value.toLowerCase().trim().replaceAll(" ", "-").replaceAll("'", "");
        slugRef.current.value = slug;
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const slug = event.target.slug.value;
        const image = event.target.image.files[0];

        if (name != "" && slug != "") {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("slug", slug);
            formData.append("image", image);
            if (isUpdate) {
                const cId = event.target.category_id.value;
                formData.append("old_name", event.target.old_name.value);
                axios.put(`${API_BASE_URL + CATEGORY_BASE_URL}/update/${cId}`, formData)
                    .then(
                        (success) => {
                            if (success.data.status == 1) {
                                event.target.reset();
                                setToggle(false);
                                openToast(success.data.msg, "success");
                                fetchCategory();
                                console.log(formData)
                            } else {
                                openToast(success.data.msg, "error")
                            }
                        }
                    ).catch(
                        (err) => {
                            console.log(err)
                            openToast("Client side error", "error")
                        }
                    )

            } else {
                axios.post(`${API_BASE_URL + CATEGORY_BASE_URL}/create`, formData)
                    .then(
                        (success) => {
                            if (success.data.status == 1) {
                                event.target.reset();
                                setToggle(false);
                                openToast(success.data.msg, "success");
                                fetchCategory();
                                console.log(formData)
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

        }
    }

    const deleteData = (_id, image_name) => {
        axios.delete(API_BASE_URL + CATEGORY_BASE_URL + "/delete/" + _id + "/" + image_name).then(
            (success) => {
                if (success.data.status == 1) {
                    openToast(success.data.msg, "success");
                    fetchCategory();
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

    const changeStatus = (id, new_status) => {
        axios.patch(API_BASE_URL + CATEGORY_BASE_URL + "/change-status/" + id + "/" + new_status)
            .then(
                (success) => {
                    if (success.data.status) {
                        openToast(success.data.msg, "success");
                        fetchCategory();
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

    const editCart = (category) => {
        console.log(category)
        setToggle(true)
        nameRef.current.value = category.name;
        slugRef.current.value = category.slug;
        categoryIdRef.current.value = category._id;
        setIsUpdate(true);
        oldNameRef.current.value = category.image;

    }


    return (
        <div>
            <div className='flex justify-between items-center text-3xl px-5 py-2'>
                <h1>Category Listing</h1>
                <button onClick={() => setToggle(true)} type="button" className="text-white flex gap-1 items-center bg-gradient-to-br  from-pink-500 to-orange-400 hover:bg-gradient-to-bl  font-medium rounded-lg text-base	 px-3 py-2 text-center me-2 mb-2"><IoIosAdd />
                    Add</button>
            </div>
            {/* add Category page started*/}
            <div className={`${toggle == true ? 'flex' : 'hidden'} items-center justify-center w-full h-full z-[99999] fixed top-0 left-0 `} style={{ background: "rgba(0,0,0,0.7)" }}>
                <div className='w-[60%] mx-auto bg-white shadow  rounded-xl'>
                    <div className='flex justify-between items-center text-3xl px-5 py-2'>
                        <h1>{isUpdate ? "Edit" : "Add "}Category</h1>
                        <button onClick={() => setToggle(false)} type="button" className="text-white flex gap-1 items-center bg-gradient-to-br  from-pink-500 to-orange-400 hover:bg-gradient-to-bl  font-medium rounded-lg text-base	 px-3 py-2 text-center me-2 mb-2"><IoClose />
                            Close</button>
                    </div><hr />
                    <form encType='multipart/form-data' onSubmit={formSubmitHandler} className='p-4' >
                        <input type="hidden" name='category_id' ref={categoryIdRef} />
                        <input type="hidden" name='old_name' ref={oldNameRef} />

                        <div className="mb-4">
                            <label htmlFor="name" className=" block text-gray-700 font-bold mb-2">
                                Category Name
                            </label>
                            <input
                                onChange={titleToslug}
                                ref={nameRef}
                                placeholder='Enter Category'
                                type="text"
                                id="name"
                                name="name"
                                className="border-2 border-black		 w-[40%] rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="slug" className=" block text-gray-700 font-bold mb-2">
                                Slug
                            </label>
                            <input
                                ref={slugRef}
                                readOnly
                                placeholder='Enter your slug'
                                type="text"
                                id="slug"
                                name="slug"
                                className="border-2 border-black w-[40%] rounded-md "
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className=" block text-gray-700 font-bold mb-2">
                                Category Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="w-[40%] rounded-md border-2 border-black"
                            />
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            {/* add Category page ended*/}


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
                                Slug
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
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
                            category.map(
                                (cat, index) => {
                                    return (
                                        <tr key={cat._id} className="bg-white border-b  dark:border-gray-700">
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {cat.name}
                                            </th>
                                            <td className="px-6 py-4">{cat.slug}</td>
                                            <td className="">
                                                {/* {cat.image}  */}
                                                <img className='w-[140px]' src={API_BASE_URL + categoryImageUrl + cat.image} alt="" />
                                            </td>
                                            <td className="px-6 py-4">{
                                                cat.status == true ?
                                                    <button onClick={() => changeStatus(cat._id, false)} className=" text-white font-medium rounded-lg text-sm px-2 py-1 bg-lime-500">Active</button> :
                                                    <button onClick={() => changeStatus(cat._id, true)} className=" text-white font-medium rounded-lg text-sm px-2 py-1 bg-red-500">Inactive</button>
                                            }</td>
                                            <td className="px-6 py-4">
                                                <div className='flex text-xl gap-4'>
                                                    <MdDelete onClick={() => deleteData(cat._id, cat.image)} className=' cursor-pointer hover:text-[red]  ' />
                                                    <MdEdit onClick={() => editCart(cat)} className=' cursor-pointer hover:text-lime-500	  ' />
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
