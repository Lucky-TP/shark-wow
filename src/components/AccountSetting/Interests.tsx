"use client";

import React from "react";

export default function Interests() {
    return (
        <div className="w-full p-8 pl-40 pr-40 pt-6">
            <div className="pb-8">
                <h2 className="border-b border-gray-400 pb-2 text-2xl font-bold text-black">
                    Category Interests
                </h2>
            </div>
            <div className="relative grid grid-cols-3 gap-6">
                {/* Technology */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-300 opacity-10">
                        Technology
                    </div>
                    <div className="relative z-10 cursor-pointer bg-white px-4 py-6 text-center shadow-md transition duration-200 hover:bg-gray-100">
                        Technology
                    </div>
                </div>

                {/* Education */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-300 opacity-10">
                        Education
                    </div>
                    <div className="relative z-10 cursor-pointer bg-white px-4 py-6 text-center shadow-md transition duration-200 hover:bg-gray-100">
                        Education
                    </div>
                </div>

                {/* Art */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-300 opacity-10">
                        Art
                    </div>
                    <div className="relative z-10 cursor-pointer bg-white px-4 py-6 text-center shadow-md transition duration-200 hover:bg-gray-100">
                        Art
                    </div>
                </div>

                {/* Film */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-300 opacity-10">
                        Film
                    </div>
                    <div className="relative z-10 cursor-pointer bg-white px-4 py-6 text-center shadow-md transition duration-200 hover:bg-gray-100">
                        Film
                    </div>
                </div>

                {/* Music */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-300 opacity-10">
                        Music
                    </div>
                    <div className="relative z-10 cursor-pointer bg-white px-4 py-6 text-center shadow-md transition duration-200 hover:bg-gray-100">
                        Music
                    </div>
                </div>

                {/* Food */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-300 opacity-10">
                        Food
                    </div>
                    <div className="relative z-10 cursor-pointer bg-white px-4 py-6 text-center shadow-md transition duration-200 hover:bg-gray-100">
                        Food
                    </div>
                </div>

                {/* Transportation */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-300 opacity-10">
                        Transportation
                    </div>
                    <div className="relative z-10 cursor-pointer bg-white px-4 py-6 text-center shadow-md transition duration-200 hover:bg-gray-100">
                        Transportation
                    </div>
                </div>

                {/* Health */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-300 opacity-10">
                        Health
                    </div>
                    <div className="relative z-10 cursor-pointer bg-white px-4 py-6 text-center shadow-md transition duration-200 hover:bg-gray-100">
                        Health
                    </div>
                </div>

                {/* Game */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-300 opacity-10">
                        Game
                    </div>
                    <div className="relative z-10 cursor-pointer bg-white px-4 py-6 text-center shadow-md transition duration-200 hover:bg-gray-100">
                        Game
                    </div>
                </div>
            </div>

            {/* Product Stages Section */}
            <div className="pb-8 pt-14">
                <h2 className="border-b border-gray-400 pb-2 text-2xl font-bold text-black">
                    Product Stages Interests
                </h2>
            </div>

            <div className="flex items-start justify-between">
                <div className="grid grid-cols-3 gap-4">
                    <div className="cursor-pointer bg-white px-12 py-9 shadow-md hover:bg-gray-100">
                        <p className="text-center"> Concept </p>
                        <p className="mt-2 text-sm text-gray-600">
                            The campaign team has an idea for the product they plan to create, but
                            hasn’t yet built a working prototype.
                        </p>
                    </div>
                    <div className="cursor-pointer bg-white px-12 py-9 shadow-md hover:bg-gray-100">
                        <p className="text-center"> Prototype </p>
                        <p className="mt-2 text-sm text-gray-600">
                            The campaign team has a working version that successfully demonstrates
                            the functionality of the final product.
                        </p>
                    </div>
                    <div className="cursor-pointer bg-white px-12 py-9 shadow-md hover:bg-gray-100">
                        <p className="text-center"> Production </p>
                        <p className="mt-2 text-sm text-gray-600">
                            The campaign team is currently producing the final product for their
                            backers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
