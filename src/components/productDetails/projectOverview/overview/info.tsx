import React from 'react'

type Props = {}

export default function ProjectOverviewInfo({}: Props) {
  return (
    <>
        <div className='flex flex-row'>
          <div className="w-16 h-16 rounded-full">
            <img
              src='/nuk.jpg'
              className="w-16 h-16 rounded-full"/>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">Nukkie Kayieju</h2>
            <p className="text-gray-600">Created at 01/03/2024</p>
          </div>
        </div>
        <div>
            <div className='flex flex-row justify-between'>
              <h3 className="text-lg font-semibold">Current Stage 1 :</h3>
              <h3 className='text-lg font-medium'>Concept</h3>
            </div>
            <h1 className="text-3xl font-bold">Project Name</h1>
            <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aliquam porro suscipit asperiores magnam animi delectus, inventore sequi natus corporis, numquam esse quam, voluptate excepturi perferendis voluptatum quas totam. Est!</p>
        </div>
    </>
  )
}