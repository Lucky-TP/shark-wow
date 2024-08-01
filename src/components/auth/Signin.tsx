import React from 'react'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithGoogle } from "src/services/authService";
import { Button } from 'antd';
import Link from 'next/link';

type Props = {}

export default function SigninPlaceHolder({}: Props) {
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
                        <p>Don't have an account? <a href="/sign-up" className="underline text-orange-300 hover:text-orange-200">Sign up</a></p>
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
                        
                        {/* <div className="w-full text-center mb-4">
                            <Button className="bg-white  items-center  px-2 py-4 rounded-full shadow-md hover:bg-gray-200 transition" loading={loading} onClick={() => onSignIn()}>
                                <img src="data:image/png;base64,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" alt="Gmail logo" className="w-6 h-6 mr-2"/>
                                <span className="text-gray-700 px-2.5">SIGN IN WITH FACEBOOK</span>
                            </Button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
