'use client'

import React, { useEffect } from 'react'

import Link from 'next/link'

type Props = {}

export default function PopularProject({}: Props) {
    const OnGettingPopularProject = () => {
        // Fetch popular project
    }

    useEffect(() => {
        OnGettingPopularProject()
    })
    
    return (
        <section className='bg-white'>
            <div className='py-[10vh]  '>
                <div className='flex flex-row items-center justify-between'>
                    <h2 className="text-3xl font-bold mb-4">Popular Project</h2>
                    <span>
                        <Link href='/catargories'>
                            <p>
                                View All
                            </p>
                        </Link>
                    </span>
                </div>

                <div className="flex overflow-x-scroll py-[5vh]">
                    <div className='min-w-[30vw]'>
                        <img src="/path/to/image.jpg" alt="" className="w-full h-48 object-cover" />
                        <h3 className="text-xl font-bold mt-2">Project Name</h3>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus, nec ultricies lorem volutpat.</p>
                    </div>
                    <div className=' min-w-[30vw]'>
                        <img src="/path/to/image.jpg" alt="" className="w-full h-48 object-cover" />
                        <h3 className="text-xl font-bold mt-2">Project Name</h3>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus, nec ultricies lorem volutpat.</p>
                    </div>
                    <div className=' min-w-[30vw]'>
                        <img src="/path/to/image.jpg" alt="" className="w-full h-48 object-cover" />
                        <h3 className="text-xl font-bold mt-2">Project Name</h3>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus, nec ultricies lorem volutpat.</p>
                    </div>
                    <div className=' min-w-[30vw]'>
                        <img src="/path/to/image.jpg" alt="" className="w-full h-48 object-cover" />
                        <h3 className="text-xl font-bold mt-2">Project Name</h3>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus, nec ultricies lorem volutpat.</p>
                    </div>
                    <div className=' min-w-[30vw]'>
                        <img src="/path/to/image.jpg" alt="" className="w-full h-48 object-cover" />
                        <h3 className="text-xl font-bold mt-2">Project Name</h3>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus, nec ultricies lorem volutpat.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}