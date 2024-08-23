import React from 'react'

export default function Buttonseemore({params} : any) {
    // console.log('getting project ?Id ',params.projectID)
    return (
        <div className="flex justify-center items-center ">
            <button className="bg-gray-200 text-black font-bold py-2 px-6 rounded-full border-2 border-blue-500 hover:bg-gray-300">
                see more
            </button>
        </div>

    )
}