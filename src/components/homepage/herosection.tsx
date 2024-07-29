import React from 'react'

type Props = {}

export default function HeroSection({}: Props) {
  return (
    <section>
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12">
            <div className="text-center max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Welcome to Shark WoW</h1>
            <p className="text-xl mb-8">
                Shark WoW is a web application designed to empower creators and engage supporters. Our platform allows creators to effectively showcase their projects, ideas, and needs. Supporters can explore these listings, find projects that resonate with them, and support the project.
            </p>
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
                Explore Now
            </button>
            </div>
        </div>
    </section>
  )
}