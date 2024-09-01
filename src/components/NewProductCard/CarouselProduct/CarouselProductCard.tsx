"use client";

import React, { useRef } from "react";
import SingleProductCard from "../SingleProduct/SingleProductCard";
import { ShowProject } from "src/interfaces/datas/project"; // Adjust the import path as needed

type Props = {
    title: string; // Single category string
    data: ShowProject[]; // Array of products passed as a prop
};

export default function CarouselProductCard({ title, data }: Props) {
    const carouselRef = useRef<HTMLDivElement>(null);
    console.log(data)
    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -carouselRef.current.clientWidth / 4,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: carouselRef.current.clientWidth / 4,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="relative">
            <p className="pb-2 font-bold">{title}</p>
            <div className="relative">
                <button
                    onClick={scrollLeft}
                    className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-transparent hover:bg-orange-400 p-2 rounded-full flex items-center justify-center h-12 w-12 border border-gray-300 hover:border-gray-500 transition-all duration-300"
                    aria-label="Scroll Left"
                >
                    <span className="sr-only">Scroll Left</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500 hover:text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <div className="pt-2 pb-4 overflow-x-hidden" ref={carouselRef}>
                    <ul className="flex space-x-8">
                        {data &&
                         data.map((product) => (
                            <li
                                key={product.projectId}
                                className="flex-shrink-0"
                                style={{ width: "calc(25% - 32px)" }}
                            >
                                <SingleProductCard product={product} />
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    onClick={scrollRight}
                    className="absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 bg-transparent hover:bg-orange-400 p-2 rounded-full flex items-center justify-center h-12 w-12 border border-gray-300 hover:border-gray-500 transition-all duration-300"
                    aria-label="Scroll Right"
                >
                    <span className="sr-only">Scroll Right</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500 hover:text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </section>
    );
}
