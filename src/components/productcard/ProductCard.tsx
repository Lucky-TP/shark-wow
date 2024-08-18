import React from 'react'

type Props = {}

export default function ProductCard({}: Props) {
  return (
    <section>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img 
            className="w-full"
            src="./assets/shark.png"
            width={400}
            height={250}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">title</div>
            <p className="text-gray-700 text-base">
              test
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <a 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Project
            </a>
          </div>
        </div>
    </section>
  )
}