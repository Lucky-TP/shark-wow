"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

interface Project {
  id: string;
  title: string;
  image: string;
  stage: string;
  amount: number;
  currency: string;
  supporters: number;
  daysLeft: number;
  status: number;
  progress: number;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Purple Violet Light",
    image: "/assets/shark.png",
    stage: "Stage 1: Concept",
    amount: 10000,
    currency: "USD",
    supporters: 6969,
    daysLeft: 43,
    status: 2,
    progress: 100
  },
  {
    id: "2",
    title: "Skibidi Turbo",
    image: "/assets/shark.png",
    stage: "Stage 1: Concept",
    amount: 5000,
    currency: "USD",
    supporters: 6969,
    daysLeft: 43,
    status: 3,
    progress: 50
  },
  {
    id: "3",
    title: "Pumpkin Cat",
    image: "/assets/shark.png",
    stage: "Stage 1: Concept",
    amount: 5000,
    currency: "USD",
    supporters: 6969,
    daysLeft: 43,
    status: 3,
    progress: 50
  },
  {
    id: "4",
    title: "Toey Car",
    image: "/assets/shark.png",
    stage: "Stage 1: Concept",
    amount: 5000,
    currency: "USD",
    supporters: 6969,
    daysLeft: 43,
    status: 3,
    progress: 50
  },
];

export default function ProjectsEnd() {

  return (
    <div className="w-full m-0 p-0">
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id}>
            <hr className="border-t-4 border-gray-600 w-full mb-[4vh]" />
            <div className="bg-orange-50 rounded-none shadow-none">
              <div className="p-4 flex justify-between">
                <div className="flex w-full items-center space-x-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-[13vw] h-[20vh] object-cover rounded"
                  />
                  <div className="w-[20vw]">
                    <h3 className="pb-4 font-semibold text-xl">{project.title}</h3>
                    {project.status == 2 && <p className="pb-4 font-medium text-xl text-green-500">SUCCESS</p>}
                    {project.status == 3 && <p className="pb-4 font-medium text-xl text-red-600">Fail at {project.stage}</p>}
                    <p className="w-full font-semibold">
                      <span className="pr-16">{project.amount.toLocaleString()} Baht</span>
                      <span className="pl-16">{project.supporters.toLocaleString()}</span>
                      <span className="font-medium ml-2">supporters</span>
                    </p>
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2 mb-2">
                      <div
                        className="bg-orange-400 h-2.5 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="pr-24">{project.progress} % of 1000 Baht</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
