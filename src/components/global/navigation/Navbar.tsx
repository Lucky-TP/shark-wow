import Link from 'next/link';
import React from 'react';

import { MdAccountCircle } from "react-icons/md";

type Props = {}

export default function Navbar({}: Props) {
  return (
    <section>
        <nav className='px-[3vw] bg-gray-200 shadow-md py-[2vh]'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex items-center'>
                    <Link href="/">
                        <img src='/assets/shark.png' className='w-[40px] h-[40px] rounded-full' alt="SharkWow Logo" />
                    {/* Shark Wow group */}
                    </Link>
                </div>
                <ul className='flex flex-row gap-x-[3vw] items-center'>
                    {/* <li>
                        <Link href="/blogs" className='text-gray-800 hover:text-blue-500'>BLOGS</Link>
                    </li> */}
                    <li>
                        <Link href="/create-project" className='text-gray-800 hover:text-blue-500'>CREATE PROJECT</Link>
                    </li>
                    <li>
                        <Link href="/catagories" className='text-gray-800 hover:text-blue-500'>CATAGORIES</Link>
                    </li>
                    <li>
                        <Link href="/sign-in" className='text-gray-800 hover:text-blue-500'>SIGN IN / SIGN UP</Link>
                    </li>
                    <li>
                        <Link href="/my-account" className='text-gray-800 hover:text-blue-500 flex items-center'>
                            <MdAccountCircle  className='text-3xl'/>
                        </Link>
                    </li>
                </ul>
            </div>
       </nav>
    </section>
  )
}