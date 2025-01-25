import React from 'react';
import { MdCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoIosColorPalette } from "react-icons/io";


const SideBar = () => {
    return (
        <div className=''>
            <aside className="bg-gradient-to-br from-gray-800 to-gray-900  inset-0 z-50 h-[100vh] max-w-[306px]  duration-300 ">
                <div className="relative border-b border-white/20">
                    <p className="flex items-center gap-4 py-2 px-16" >
                        <h6 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-relaxed text-white">
                            IShop
                        </h6>
                    </p>
                </div>
                <div className="m-4">
                    <ul className="mb-4 flex flex-col gap-1">
                        <li>
                            <Link to={'/admin'}>
                                <button
                                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="w-5 h-5 text-inherit"
                                    >
                                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                    </svg>
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        dashboard
                                    </p>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/admin/category'}>
                                <button
                                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                    type="button"
                                >
                                    <MdCategory className="w-5 h-5 text-inherit" />
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        Category
                                    </p>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/admin/color'}>
                                <button
                                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                    type="button"
                                >
                                    <IoIosColorPalette className="w-5 h-5 text-inherit" />
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        Color
                                    </p>
                                </button>
                            </Link>
                        </li>
                        <li>
                        <Link to={'/admin/product'}>
                                <button
                                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                    type="button"
                                >
                                    <FaProductHunt className="w-5 h-5 text-inherit" />
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        Product                                    </p>
                                </button>
                                </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default SideBar;
