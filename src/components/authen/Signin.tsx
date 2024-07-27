import React from 'react'

type Props = {}

export default function SigninPlaceHolder({}: Props) {
  return (
    <body className="h-screen bg-gray-100">
    <section className="h-screen w-screen flex items-center justify-center">
        <div className="flex w-full h-full rounded-lg shadow-lg overflow-hidden">
            <div className="w-1/2 bg-white flex flex-col justify-center items-center p-8">
                <img src="./assets/shark.png" alt="Profile Image" className="w-20 h-20 rounded-full mb-6"></img>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome back</h1>
                <p className="text-gray-600 text-lg">Sign in to shark wow</p>
            </div>
            <div className="w-1/2 bg-blue-400 flex flex-col justify-center items-center p-8 rounded-tl-lg rounded-bl-lg">
                <h1 className="text-2xl font-bold text-white mb-8">Welcome to shark wow family</h1>
                <button className="bg-white flex items-center px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition">
                    <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" alt="Gmail logo" className="w-6 h-6 mr-2"/>
                    <span className="text-gray-700">sign in with gmail</span>
                </button>
            </div>
        </div>
    </section>
</body>
  )
}
