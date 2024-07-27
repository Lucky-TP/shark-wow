import React from 'react'

type Props = {}

export default function SigninPlaceHolder({}: Props) {
  return (
    <section>
        <div className="h-screen w-screen flex bg-[#f4f4ec] ">
            <div className="w-3/6 flex flex-col justify-center items-start p-16 ">
                <img src="./assets/shark.png" alt="shark wow img" className="absolute top-10 left-14 w-14 h-14 rounded-full"/>
                <div className='fixed top-20'>
                    <p className="text-gray-600 mb-5 mt-20">Welcome back</p>
                    <h1 className="text-4xl font-medium">Sign in to Shark wow</h1>
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center bg-white p-16 rounded-tl-4xl">
                <div className="w-full pl-20">
                    <div className="text-right text-sm text-gray-600 mb-4 absolute top-10 right-14">
                        <p>Don't have an account? <a href="#" className="underline text-blue-500">Sign up</a></p>
                    </div>
                    <div className="flex flex-col mt-24">
                        <p className="font-medium text-gray-700 mb-4">Your account details</p>
                        <div className="w-full mb-4">
                            <input className="border border-gray-300 w-full p-3 rounded" type="email" id="email" placeholder="Email Address"/>
                        </div>
                        <div className="w-full mb-4">
                            <input className="border border-gray-300 w-full p-3 rounded" type="password" id="password" placeholder="Password"/>
                        </div>
                        <div className="w-full text-left mb-4">
                            <a href="#" className="underline text-blue-500 ">Forgot your password?</a>
                        </div>
                        <div className="w-full mt-auto text-center mb-4">
                            <p className="mb-4 text-sm text-gray-600">By clicking the Sign In button below, you agree to the Shark wow <a href="#" className="underline text-blue-500">Terms of Service</a> and acknowledge the <a href="#" className="underline text-blue-500">Privacy Notice</a>.</p>
                        </div>
                        <div className="w-full text-center mb-4">
                            <button
                                type="submit"
                                className="bg-blue-600 inline-block w-2/6  rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                data-twe-ripple-init
                                data-twe-ripple-color="light">
                                Sign in
                            </button>
                        </div>
                        <div className="w-full flex items-center justify-center mb-4">
                            <span className="border-t border-gray-300 flex-grow"></span>
                            <span className="mx-2 text-gray-500">OR</span>
                            <span className="border-t border-gray-300 flex-grow"></span>
                        </div>
                        <div className="w-full text-center">
                            <a href="#" className='justify-center items-center'>
                                <button
                                    type="submit"
                                    className="bg-blue-600 inline-block w-2/6 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                    data-twe-ripple-init
                                    data-twe-ripple-color="light">
                                    Continu with Facebook
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
