import React from 'react';

type Props = {};

export default function Ckeditor({}: Props) { // เปลี่ยนชื่อเป็น UserProfile
  return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl min-h-[600px]">
            <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-black rounded-full"></div>
                <div className="ml-4">
                    <div className="font-semibold">Creator Name</div>
                    <div className="text-gray-500">YYYY/MM/DD (Current Date)</div>
                </div>
            </div>
        <div className="bg-gray-200 rounded-lg h-64 mt-20  flex items-center justify-center min-h-[300px]">
            <span>CK editor</span>
        </div>
        <div className="flex justify-end mt-4">
            <button className="bg-black text-white font-semibold py-2 px-4 rounded-lg">
                Create Blog
            </button>
        </div>
        </div>
    </div>



  );
}