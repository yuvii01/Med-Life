import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/MainContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductBox from '../../Components/Website/ProductBox';


const Store = () => {
    const { category, colors, products, fetchCategory, fetchColor, fetchProduct } = useContext(Context);
    const [limit, setLimit] = useState(5);
    const { category_slug } = useParams();
    const [selColor, setSelColor] = useState(null);
    let [searchParams, setSearchParams] = useSearchParams();

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    useEffect(
        () => {
            fetchCategory();
            fetchColor();
            if (searchParams.get('color_id')) {
                setSelColor(searchParams.get('color_id'));
            }
            if (searchParams.get('limit')) {
                setLimit(searchParams.get('limit'));
            }
        }, []
    );
    useEffect(
        () => {
            fetchProduct(limit, selColor, category_slug);

            const searchQuery = { limit };

            if (selColor) {
                searchQuery.color_id = selColor
            }
            setSearchParams(searchQuery);
        },
        [limit, selColor, category_slug,]
    )

    return (
        <div className='w-[1280px] mx-auto '>
            <div className='grid grid-cols-4 '>
                <div>
                    <div className='bg-[#F6F7F8] rounded-lg   py-4 pl-5'>
                        <h1 className='uppercase font-bold'>Category</h1>
                        <ul className='mt-2'>
                            <Link to={"/store"}>
                                <li className=' m-1 cursor-pointer' style={{ fontWeight: category_slug == null ? 'bold' : '' }}>All</li></Link>
                            {
                                category.map(
                                    (cat, i) => {
                                        return (
                                            <Link key={i} to={"/store/" + cat.slug} style={{ fontWeight: category_slug == cat.slug ? 'bold' : '' }}>
                                                <li className='m-1 cursor-pointer' key={i}>{cat.name}</li>
                                            </Link>
                                        )
                                    }
                                )
                            }
                        </ul>
                    </div>
                    <div className='bg-[#F6F7F8] rounded-lg  my-5 py-5 pl-5'>
                        <h1 className='uppercase font-bold mb-2'>colors</h1>
                        <ul>
                            {
                                colors.map(
                                    (color, i) => {
                                        return (
                                            <li key={i} className='mt-2 cursor-pointer' style={{ fontWeight: selColor == color._id ? 'bold' : '' }} onClick={() => setSelColor(color._id)}>
                                                <span
                                                    className='px-2.5 rounded-full m-2   ' style={{ background: color.code }}>
                                                </span>
                                                {color.name}
                                            </li>

                                        )
                                    }
                                )
                            }
                        </ul>
                        <button onClick={() => setSelColor(null)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 my-2 rounded'>RESET</button>
                    </div>
                </div>
                <div className='ml-5 col-span-3'>
                    <Slider {...settings}>
                        <div className='h-[230px] bg-[#2E90E5] relative '>
                            <h1 className='text-white mt-10 ml-5 text-3xl'>IPhone 11</h1>
                            <img src="store\Apple_iPhone_11-removebg-preview.png" className='absolute w-[300px]  top-4 left-[650px]' alt="" />
                            <button className='ml-6 text-white mt-10 underline underline-offset-4'>Shop Now</button>
                        </div>
                        <div className='h-[230px] bg-[#2E90E5] relative'>
                            <h1 className='text-white mt-10 ml-5 text-3xl'>Apple IPad</h1>
                            <img src="store/Apple_Ipad-removebg-preview.png" alt="" className='absolute w-[300px]  top-4 left-[650px]' />
                            <button className='ml-6 text-white mt-10 underline underline-offset-4'>Shop Now</button>
                        </div>
                        <div className='h-[230px] bg-[#2E90E5] relative'>
                            <h1 className='text-white mt-10 ml-5 text-3xl'>MacBook M1 </h1>
                            <img src="store/Apple_Macbook_Air-removebg-preview.png" alt="" className='absolute w-[300px]  top-4 left-[600px]' />
                            <button className='ml-6 text-white mt-10 underline underline-offset-4'>Shop Now</button>
                        </div>
                        <div className='h-[230px] bg-[#2E90E5] relative'>
                            <h1 className='text-white mt-10 ml-5 text-3xl'>Apple Watch</h1>
                            <img src="store/Apple_Watch_21-1-removebg-preview.png" alt="" className='absolute w-[300px]  top-4 left-[650px]' />
                            <button className='ml-6 text-white mt-10 underline underline-offset-4'>Shop Now</button>
                        </div>
                        <div className='h-[230px] bg-[#2E90E5] relative'>
                            <h1 className='text-white mt-10 ml-5 text-3xl'>Apple HeadPhone</h1>
                            <img src="store/beats_solo_2_2x-removebg-preview.png" alt="" className='absolute w-[300px]  top-1 left-[650px]' />
                            <button className='ml-6 text-white mt-10 underline underline-offset-4'>Shop Now</button>
                        </div>
                    </Slider>
                    <div className='bg-[#F6F7F8] mt-8 mb-2 py-3 rounded-lg'>
                        <select value={limit} onChange={(e) => setLimit(e.target.value)} className='ml-4 px-2 outline-none bg-transparent'>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="0">All</option>

                        </select>
                    </div>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 '>
                        {
                            products.map(
                                (prod, i) => {
                                    return (
                                        <ProductBox {...prod} key={i} />
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Store;
