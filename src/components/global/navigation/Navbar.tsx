import Link from 'next/link';
import React from 'react';

import { MdAccountCircle } from "react-icons/md";

type Props = {}

export default function Navbar({}: Props) {
  return (
    <section>
        <nav className='px-[3vw] bg-gray-200 shadow-md py-[2vh]'>
            <div className='flex flex-row justify-between items-center'>
                <ul className='flex flex-row items-center gap-x-[3vw]'>
                    <li>
                        <Link href="/">
                            <img src='/assets/shark.png' className='w-[40px] h-[40px] rounded-full' alt="SharkWow Logo" />
                            {/* Shark Wow group */}
                        </Link>
                    </li>
                   <li>
                        <Link href='/explore'>
                            <h1 className='text-gray-600 text-lg font-medium'>EXPLORE</h1>
                        </Link>
                   </li>
                    
                </ul>
                <ul className='flex flex-row gap-x-[3vw] items-center'>
                    {/* <li>
                        <Link href="/blogs" className='text-gray-800 hover:text-blue-500'>BLOGS</Link>
                    </li> */}
                    <li>
                        <Link href="/create-project" className=''>
                            <h1 className='text-gray-600 text-lg font-medium'>CREATE PROJECT</h1>
                        </Link>
                    </li>
                    <li>
                        <Link href="/catagories" className=''>
                             <h1 className='text-gray-600 text-lg font-medium'>CATAGORIES</h1>
                        </Link>
                    </li>
 
                    <li>
                        <Link href="/catagories" className=''>
                             <h1 className='text-gray-600 text-lg font-medium'>SIGN IN / SIGN UP</h1>
                        </Link>
                    </li>
                    <li>
                        <Link href="/my-account" className='text-gray-600 text-lg font-medium flex items-center'>
                            <MdAccountCircle  className='text-3xl'/>
                        </Link>
                    </li>
                </ul>
            </div>
       </nav>
    </section>
  )
}