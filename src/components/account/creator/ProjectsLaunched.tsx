"use client"
import React, { useEffect, useState } from 'react'
import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary'
interface Project {
    id: string
    title: string
    image: string
    stage: string
    amount: number
    currency: string
    supporters: number
    daysLeft: number
  }
  
  const projects: Project[] = [
    {
      id: "1",
      title: "Purple Violet Light",
      image: "/assets/shark.png",
      stage: "Stage 1: Concept",
      amount: 5000,
      currency: "USD",
      supporters: 6969,
      daysLeft: 43
    },
    {
      id: "2",
      title: "Skibidi Turbo",
      image: "/assets/shark.png",
      stage: "Stage 1: Concept",
      amount: 5000,
      currency: "USD",
      supporters: 6969,
      daysLeft: 43
    },
    {
      id: "3",
      title: "Pumpkin Cat",
      image: "/assets/shark.png",
      stage: "Stage 1: Concept",
      amount: 5000,
      currency: "USD",
      supporters: 6969,
      daysLeft: 43
    },
    {
      id: "4",
      title: "Toey Car",
      image: "/assets/shark.png",
      stage: "Stage 1: Concept",
      amount: 5000,
      currency: "USD",
      supporters: 6969,
      daysLeft: 43
    }
  ]
export default function ProjectsLaunched(){
    

    return (
    <div className=" w-full m-0 p-0 ">
      <div className=" space-y-4">
        {projects.map((project) => (
          <><hr className='border-t-4 border-gray-600 w-full mb-[4vh]' />
            <div key={project.id} className="bg-orange-50  rounded-none shadow-none">
                <div className=" p-4 flex items-center justify-between">
                    <div className=" flex w-ful items-center space-x-4">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-[13vw] h-[20vh] object-cover rounded" />
                        <div className='w-[20vw]'>
                            <h3 className="pb-4 font-semibold text-xl">{project.title}</h3>
                            <p className="pb-4 font-medium text-xl  ">{project.stage}</p>
                            <p className="w-full font-semibold">
                                <span className='pr-16'>{project.amount.toLocaleString()} Baht</span>
                                <span className='pl-16'>{project.supporters.toLocaleString()}</span><span className='font-medium ml-2'>supporters</span>
                            </p>
                            <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2 mb-2">
                                <div
                                    className="bg-orange-400 h-2.5 rounded-full"
                                    style={{ width: `${50}%` }}
                                ></div>
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className='pr-24'>50 % of 5000 Baht</span>
                                <span className='pl-8'>{project.daysLeft} days left</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <button className="font-semibold py-2 px-4 rounded-md w-full bg-orange-400 text-white hover:bg-orange-500">
                            Edit Projects
                        </button>
                        <button className="font-semibold py-2 px-4 rounded-md w-full bg-orange-400 text-white hover:bg-orange-500">
                            Operate
                        </button>
                    </div>
                </div>
            </div></>
        ))}
      </div>
    </div>
        
        
    )
}