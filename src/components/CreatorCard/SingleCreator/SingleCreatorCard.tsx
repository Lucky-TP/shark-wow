import React from 'react';
import { PopularCreator } from 'src/interfaces/models/common';
import Image from 'next/image';

interface CreatorCardProps {
    creator: PopularCreator;
}

const SingleCreatorCard = ({ creator }: CreatorCardProps) => {
    
    return (
        <section>
            <div className='pl-6 p-3'>
                <div className="w-full h-full rounded-lg overflow-hidden relative group">
                    <div className="relative w-full h-48"> {/* Fixed height for the image container */}
                        <Image
                            className="w-full h-full object-contain" // Ensure the image fits within the container without cropping
                            src={`${creator.profileImageUrl}`}
                            alt={`${creator.firstName} ${creator.lastName}'s profile picture`}
                            width={400}
                            height={400}
                        />
                        {/* Hover elements */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <button className="absolute bottom-2 bg-orange-600 text-white font-semibold py-2 px-4 rounded-full">
                                View Creator
                            </button>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="bg-orange-600 text-white p-2 rounded-full">
                                <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M19 21l-7-5.3L5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="pt-3 py-1">
                        <h2 className="text-xl font-semibold text-gray-800">{creator.firstName}<span>  </span>{creator.lastName}</h2>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default SingleCreatorCard;
