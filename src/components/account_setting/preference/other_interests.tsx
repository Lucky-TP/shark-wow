"use client";

import React from "react";

const Other_Interests: React.FC = () => {
    return (
        <div className="p-8 w-full pt-6 pl-40 pr-40">
            <div className="pb-8">
                <h2 className="text-black text-xl font-bold pb-2 border-b border-gray-400">
                    Other Interests
                </h2>
            </div>
            <div className="flex flex-col gap-12">
                {/* Project Types Section */}
                <div className="flex justify-between items-start">
                    <div className="w-1/3">
                        <h3 className="text-black text-lg font-semibold pb-2">Project Types</h3>
                        <p className="text-sm text-gray-600">
                            Select the categories you’d like to see more often.
                        </p>
                    </div>
                    <div className="w-2/3 grid grid-cols-2 gap-4">
                        <div className="bg-white shadow-md py-9 px-12 cursor-pointer hover:bg-gray-100">
                            Crowdfunding Campaign
                            <p className="text-sm text-gray-600 mt-2">
                                Back project before their campaign deadlines to help bring them to
                                life.
                            </p>
                        </div>
                        <div className="bg-white shadow-md py-9 px-12 cursor-pointer hover:bg-gray-100">
                            InDemand
                            <p className="text-sm text-gray-600 mt-2">
                                Back projects after the campaign deadline has passed to show
                                continuing support and receives perks at early discount.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Product Stages Section */}
                <div className="flex justify-between items-start">
                    <div className="w-1/3">
                        <h3 className="text-black text-lg font-semibold pb-2">Product Stages</h3>
                        <p className="text-sm text-gray-600 pr-12">
                            Products Stages are selected by campaign teams who are producing
                            physical products to indicate how far along they are with their product
                            development. Select the Product Stages you’d like to see more often.
                        </p>
                    </div>
                    <div className="w-2/3 grid grid-cols-2 gap-4">
                        <div className="bg-white shadow-md py-9 px-12 cursor-pointer hover:bg-gray-100">
                            Concept
                            <p className="text-sm text-gray-600 mt-2">
                                The campaign team has an idea for the product they plan to create,
                                but hasn’t yet built a working prototype.
                            </p>
                        </div>
                        <div className="bg-white shadow-md py-9 px-12 cursor-pointer hover:bg-gray-100">
                            Prototype
                            <p className="text-sm text-gray-600 mt-2">
                                The campaign team has a working version that successfully
                                demonstrates the final product’s functionality.
                            </p>
                        </div>
                        <div className="bg-white shadow-md py-9 px-12 cursor-pointer hover:bg-gray-100">
                            Production
                            <p className="text-sm text-gray-600 mt-2">
                                The campaign team is currently producing the final product for their
                                backers.
                            </p>
                        </div>
                        <div className="bg-white shadow-md py-9 px-12 cursor-pointer hover:bg-gray-100">
                            Shipping
                            <p className="text-sm text-gray-600 mt-2">
                                The campaign team has begun shipping the final product to their
                                backers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Other_Interests;
