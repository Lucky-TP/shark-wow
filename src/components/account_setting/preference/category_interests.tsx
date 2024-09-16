"use client";

import React from "react";

const Category_Interests: React.FC = () => {
    return (
        <div className="p-8 w-full pt-6 pl-40 pr-40">
            <div className="pb-8">
                <h2 className="text-black text-xl font-bold pb-2 border-b border-gray-400">
                    Category Interests
                </h2>
            </div>
            <div className="flex flex-col gap-8">
                {/* Tech & Innovation Section */}
                <div className="flex justify-between items-start">
                    <div className="w-1/3">
                        <h3 className="text-black text-lg font-semibold pb-2">Tech & Innovation</h3>
                        <p className="text-sm text-gray-600">
                            Select the categories you’d like to see more often.
                        </p>
                    </div>
                    <div className="w-2/3 grid grid-cols-4 gap-4">
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Audio
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Camera Gear
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Education
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Energy & Green Tech
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Food & Beverages
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Health & Fitness
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Home
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Phones & Accessories
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Productivity
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Transportation
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Travel & Outdoor
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Fashion & Wearables
                        </div>
                    </div>
                </div>

                {/* Creative Works Section */}
                <div className="flex justify-between items-start">
                    <div className="w-1/3">
                        <h3 className="text-black text-lg font-semibold pb-2">Creative Works</h3>
                        <p className="text-sm text-gray-600">
                            Select the categories you’d like to see more often.
                        </p>
                    </div>
                    <div className="w-2/3 grid grid-cols-4 gap-4">
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Art
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Comics
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Dance & Theater
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Film
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Music
                        </div>
                    </div>
                </div>

                {/* Community Projects Section */}
                <div className="flex justify-between items-start">
                    <div className="w-1/3">
                        <h3 className="text-black text-lg font-semibold pb-2">
                            Community Projects
                        </h3>
                        <p className="text-sm text-gray-600">
                            Select the categories you’d like to see more often.
                        </p>
                    </div>
                    <div className="w-2/3 grid grid-cols-4 gap-4">
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Culture
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Environment
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Human Rights
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Local Businesses
                        </div>
                        <div className="bg-white shadow-md py-8 px-3 text-center cursor-pointer hover:bg-gray-100">
                            Wellness
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category_Interests;
