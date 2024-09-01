import React from 'react';
import { ShowProject } from "src/interfaces/datas/project";
import Image from 'next/image';
import { useRouter } from "next/navigation";

interface ProductCardProps {
    product: ShowProject;
}

const SingleProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter();
    
    const percentageFunded = Math.round(
        (product.stages[0].currentFunding / product.stages[0].goalFunding) * 100
    );
    
    const handleViewProject = () => {
        router.push(`/explore/${product.projectId}`);
        // router.push(`/${product.projectId}`);
    };

    return (
        <section>
            <div className="pl-6 p-3">
                <div className="w-full h-full rounded-lg overflow-hidden relative group">
                    <div className="relative w-full h-48">
                        {" "}
                        {/* Fixed height for the image container */}
                        <Image
                            className="w-full h-full object-contain" // Ensure the image fits within the container without cropping
                            src={product.carouselImageUrls[0]}
                            alt={product.projectId}
                            width={400}
                            height={400}
                        />
                        {/* Hover elements */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <button 
                                className="absolute bottom-2 bg-orange-600 text-white font-semibold py-2 px-4 rounded-full"
                                onClick={handleViewProject}
                            >
                                View Project
                            </button>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="bg-orange-600 text-white p-2 rounded-full">
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 21l-7-5.3L5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="pt-3 py-1">
                        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Fund at ${product.stages[0].fundingCost}
                        </p>
                    </div>
                    <div>
                        <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2 mb-2">
                            <div
                                className="bg-orange-400 h-2.5 rounded-full"
                                style={{ width: `${percentageFunded}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-left">
                            <span className="text-sm text-gray-600">
                                ${product.stages[0].currentFunding} raised |
                            </span>
                            <span className="text-sm text-gray-600 ml-1">
                                {percentageFunded}% funded
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleProductCard;
