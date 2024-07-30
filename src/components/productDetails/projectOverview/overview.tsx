import React from 'react'

type Props = {}

export default function ProjectOverview({}: Props) {
  return (
    <section className='flex flex-col max-h-[70vh] min-h-[70vh] w-full bg-slate-400'>
        <div className='flex flex-row'>
          <div className="w-16 h-16 bg-black rounded-full"></div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">Creator Name</h2>
            <p className="text-gray-600">x Project Created</p>
          </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold">Stage 1 : Concept</h3>
            <h1 className="text-3xl font-bold">Project Name</h1>
            <p className="text-gray-600 mb-4">A brief detail of this project</p>
        </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold">$ 5000 USD</span>
            <span className="text-gray-600">6969 backers</span>
          </div>
          <div className="w-full bg-gray-300 h-1 rounded-full mb-2">
              <div className="bg-orange-500 h-full rounded-full" style={{ width: '50%' }}></div>
          </div>
          <div className="flex justify-between items-center text-gray-600">
              <span>50% of $ 10000</span>
              <span>43 days left</span>
          </div>
        <div>
          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Make Donate</h3>
            <label className="block text-gray-600 mb-2">Amount</label>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input
                type="text"
                className="pl-8 pr-3 py-2 border rounded-lg w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="xxx"
              />
            </div>
            <button className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">
              Continue
            </button>
          </div>

          <div className="space-y-4">
            <button className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">
              Support this Project
            </button>
            <button className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">
              Add to favorite
            </button>
          </div>
        </div>

    </section>
  )
}