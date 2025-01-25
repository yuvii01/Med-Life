import React, { useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { Context } from '../../../Context/MainContext';
import makeAnimated from 'react-select/animated';
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Add = () => {
    const nameRef = useRef();
    const slugRef = useRef();
    const priceRef = useRef();
    const discountRef = useRef();
    const finalRef = useRef();

    const animatedComponents = makeAnimated();
    const [file, setFile] = useState(null);
    const [prodCategory, setProdCategory] = useState(null);
    const [prodColor, setProdColor] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    const removeHandler = (file) => {
        setFile(null)
    }

    const { colors, category, fetchCategory, fetchColor, API_BASE_URL, PRODUCT_BASE_URL, openToast } = useContext(Context);
    const navigator = useNavigate();

    useEffect(
        () => {
            fetchCategory();
            fetchColor();

        }, []
    )

    const titleToslug = () => {
        const slug = nameRef.current.value.toLowerCase().trim().replaceAll(" ", "-").replaceAll("'", "");
        slugRef.current.value = slug;
    }

    const ColorOptions = colors.map(
        (colors) => {
            return {
                label: colors.name,
                value: colors._id,
            }
        }
    )

    const CategoryOptions = category.map(
        (cat) => {
            return {
                label: cat.name,
                value: cat._id,
            }
        }
    )

    function calDiscount() {
        const price = priceRef.current.value;
        const discountPer = discountRef.current.value;
        if (price != "" && discountPer != "") {
            const d = price * (discountPer / 100);
            finalRef.current.value = price - d;
        }
        else {

        }
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", event.target.name?.value);
        formData.append("slug", event.target.slug?.value);
        formData.append("price", event.target.price?.value);
        formData.append("discount_percent", event.target.discount?.value);
        formData.append("discount_price", event.target.final_price?.value);
        formData.append("image", file);
        formData.append("category", prodCategory);
        formData.append("color", JSON.stringify(prodColor));
        axios.post(API_BASE_URL + PRODUCT_BASE_URL + "/create", formData)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        openToast(success.data.msg, "success");
                        navigator("/admin/product");
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
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mx-8 pb-2">Add Product</h1>
                <form onSubmit={formSubmitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className='grid grid-cols-2 gap-8'>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Product Name
                            </label>
                            <input
                                name='name'
                                onChange={titleToslug}
                                ref={nameRef}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Product Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="slug"
                            >
                                Product Slug
                            </label>
                            <input
                                name="slug"
                                ref={slugRef}
                                readOnly
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="slug"
                                type="text"
                                placeholder="Product Slug"
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-8'>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="price"
                            >
                                Price
                            </label>
                            <input
                                onChange={calDiscount}
                                ref={priceRef}
                                min={0}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                type="number"
                                placeholder="Price"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="discount"
                            >
                                Discount %
                            </label>
                            <input
                                onChange={calDiscount}
                                defaultValue={0}
                                min={0}
                                max={99}
                                ref={discountRef}
                                name='discount'
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="discount"
                                type="number"
                                placeholder=" Enter Discount %"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="final_price"
                            >
                                Final Price
                            </label>
                            <input
                                onChange={calDiscount}
                                ref={finalRef}
                                readOnly
                                name='final_price'
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="final_price"
                                type="number"
                                placeholder="Final Price"
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-8'>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="category"
                            >
                                Category
                            </label>
                            <Select
                                onChange={(option) => {
                                    setProdCategory(option.value)
                                }}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                name="category"
                                options={CategoryOptions}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="color"
                            >
                                Color
                            </label>
                            <Select
                                onChange={(options) => {
                                    console.log(options)
                                    const d = options.map((option) => option.value)
                                    setProdColor(d)
                                }}
                                className="basic-single"
                                classNamePrefix="select"
                                isSearchable={true}
                                components={animatedComponents}

                                name="color"
                                isMulti
                                options={ColorOptions}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="image"
                        >
                            Drag Image
                        </label>
                        <span className='flex flex-col gap-2 '>
                            <FileUploader handleChange={handleChange} name="file" />
                            <h1>{file?.name}</h1>

                            <span className='text-[white] rounded-md px-2 py-0.5  cursor-pointer bg-[red] w-[75px]' onClick={removeHandler}>Remove</span>
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Add;
