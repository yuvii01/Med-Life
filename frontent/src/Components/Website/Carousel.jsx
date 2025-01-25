// Carousel.js
import React, { useState } from 'react';

const Carousel = ({ productCro }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevProduct = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? productCro.length - 3 : prevIndex - 1));
    };

    const nextProduct = () => {
        setCurrentIndex((prevIndex) => (prevIndex === productCro.length - 3 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div className="flex">
                    {productCro.map((productCro, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 w-1/3 ${index >= currentIndex && index < currentIndex + 3 ? 'opacity-100' : 'opacity-0'
                                } transition-opacity duration-500 ease-in-out`}
                        >
                            {/* Product card */}
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <img src={productCro.image} alt={productCro.name} className="w-full h-48 object-cover mb-4" />
                                <h2 className="text-lg font-semibold">{productCro.name}</h2>
                                <p className="text-gray-600">{productCro.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-300 px-2 py-1 rounded-l"
                onClick={prevProduct}
            >
                Prev
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-300 px-2 py-1 rounded-r"
                onClick={nextProduct}
            >
                Next
            </button>
        </div>
    );
};

export default Carousel;
