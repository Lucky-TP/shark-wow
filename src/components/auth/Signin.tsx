import React from 'react'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithGoogle } from "src/services/authService";
import { Button } from 'antd';
import Link from 'next/link';

type Props = {}

export default function Signin({}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const onSignIn = async () => {
        try {
            setLoading(true);
            await signInWithGoogle();
            router.push("/profile");
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
  return (
    <section>
        <div className="h-screen w-screen flex bg-orange-300 ">
            <div className="w-3/6 flex flex-col justify-center items-start p-16 ">
                    <Link href="/">
                    <img src="./assets/shark.png" alt="shark wow img" className="absolute top-10 left-14 w-14 h-14 rounded-full"/>
                    </Link>
                <div className='fixed top-20'>
                    <p className="text-white mb-5 mt-20">Welcome back</p>
                    <h1 className="text-white text-4xl font-medium">Sign in to Shark Wow</h1>
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center bg-white p-16 rounded-tl-4xl">
                <div className="w-full pl-20">
                    <div className="text-right text-sm text-gray-600 mb-4 absolute top-10 right-14">
                        <p>Don&apost have an account? <a href="/sign-up" className="underline text-orange-300 hover:text-orange-200">Sign up</a></p>
                    </div>
                    <div className="flex flex-col mt-24">
                        <p className="font-medium text-gray-700 mb-4">Your account details</p>
                        <form>
                            <div className="w-full mb-4">
                                <input className="border border-gray-300 w-full p-3 rounded" type="email" id="email" placeholder="Email Address"/>
                            </div>
                            <div className="w-full mb-4">
                                <input className="border border-gray-300 w-full p-3 rounded" type="password" id="password" placeholder="Password"/>
                            </div>
                            <div className="w-full text-left mb-4">
                                <a href="#" className="underline text-orange-300 hover:text-orange-200">Forgot your password?</a>
                            </div>
                            <div className="w-full mt-auto text-center mb-4">
                                <p className="mb-4 text-sm text-gray-600">By clicking the Sign In button below, you agree to the Shark wow <a href="#" className="underline text-orange-300 hover:text-orange-200">Terms of Service</a> and acknowledge the <a href="#" className="underline text-orange-300 hover:text-orange-200">Privacy Notice</a>.</p>
                            </div>
                            <div className="w-full text-center mb-4">
                                <button className="bg-orange-300  items-center px-3 py-1.5 rounded-full shadow-md hover:bg-orange-200 transition">
                                        <span className="text-white mx-12 my-">Sign in</span>
                                </button>
                            </div>
                        </form>
                        <div className="w-full flex items-center justify-center mb-4">
                            <span className="border-t border-gray-300 flex-grow"></span>
                            <span className="mx-2 text-gray-500">OR</span>
                            <span className="border-t border-gray-300 flex-grow"></span>
                        </div>
                        <div className="w-full text-center mb-4">
                            <button className="bg-orange-300  items-center px-3 py-1 my-0.5 rounded-full shadow-md hover:bg-orange-200 transition" onClick={() => onSignIn()}>
                                <div className='flex'>
                                    <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" alt="Gmail logo" className="w-6 h-6 mr-2"/>
                                    <span className="text-white">Sign in with gmail</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
