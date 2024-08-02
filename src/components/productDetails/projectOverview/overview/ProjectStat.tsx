import React from 'react'

type Props = {}

export default function ProjectStat({}: Props) {
  return (
    <>
        <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold">$ 5000 USD</span>
            <span className="text-gray-600">10 backers</span>
        </div>
        <div className="w-full bg-gray-300 h-1 rounded-full mb-2">
            <div className="bg-orange-500 h-full rounded-full" style={{ width: '50%' }}></div>
        </div>
        <div className="flex justify-between items-center text-gray-600">
            <span>50% of $ 10000</span>
            <span>43 days left</span>
        </div>
    </>
  )
}