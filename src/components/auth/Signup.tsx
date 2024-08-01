import React from 'react'
import Link from 'next/link';

type Props = {}

export default function Signup({}: Props) {
    
  return (
    <section>
        <div className="h-screen w-screen flex bg-orange-300 ">
            <div className="w-3/6 flex flex-col justify-center items-start p-16 ">
                    <Link href="/">
                    <img src="./assets/shark.png" alt="shark wow img" className="absolute top-10 left-14 w-14 h-14 rounded-full"/>
                    </Link>
                <div className='fixed top-20'>
                    <p className="text-white mb-5 mt-20">Welcome to Shark Wow</p>
                    <h1 className="text-white text-4xl font-medium">Sign up to Shark Wow</h1>
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center bg-white p-16 rounded-tl-4xl">
                <div className="w-full pl-20">
                    <div className="text-right text-sm text-gray-600 mb-4 absolute top-10 right-14">
                        <p>Already have an account? <a href="/sign-in" className="underline text-orange-300 hover:text-orange-200">Sign in</a></p>
                    </div>
                    <div className="flex flex-col mt-24">
                        <p className="font-medium text-gray-700 mb-4">Your account details</p>
                        <form>
                            <div className='flex flex-row'>
                                <div className="w-full mb-4">
                                    <label >First Name</label>
                                    <input  className="border border-gray-300 w-full p-3 rounded" type="text" id="firstname" placeholder="First Name" required/>
                                </div><div className="w-full mb-4">
                                    <label >Last Name</label>
                                    <input className="border border-gray-300 w-full p-3 rounded" type="text" id="lastname" placeholder="Last Name" required/>
                                </div>
                            </div>
                            <div className="w-full mb-4">
                                <label >Email Address</label>
                                <input className="border border-gray-300 w-full p-3 rounded" type="email" id="email" placeholder="Email Address" required/>
                            </div>
                            <div className="w-full mb-4">
                                <label >Password</label>
                                <input className="border border-gray-300 w-full p-3 rounded" type="password" id="password" placeholder="Password" required/>
                            </div>
                            
                            <div className='flex flex-row'>
                                
                                <div className="w-full mb-4">
                                    <label >Date of Birth</label>
                                    <input className="border border-gray-300 w-full p-3 rounded" type="date" id="dateofbirth" placeholder="Date of Birth" required/>
                                </div>
                                <div className="w-full mb-4">
                                    <label >Country</label>
                                    <input className="border border-gray-300 w-full p-3 rounded" type="password" id="password" placeholder="Country" required/>
                                </div>
                            </div>
                            <div className='flex flex-row mb-4'>
                                <div className="w-full mb-4">
                                    <label >City</label>
                                    <input className="border border-gray-300 w-full p-3 rounded" type="password" id="password" placeholder="City" required/>
                                </div><div className="w-full mb-4">
                                    <label >Postal Code</label>
                                    <input className="border border-gray-300 w-full p-3 rounded" type="password" id="password" placeholder="Postal Code" required/>
                                </div>
                            </div>
                        </form>
                        <div className="w-full text-center mb-4">
                            <button type ="submit" className="bg-orange-300  items-center px-3 py-1.5 rounded-full shadow-md hover:bg-orange-200 transition">
                                    <span className="text-white mx-12 my-">Sign up</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
