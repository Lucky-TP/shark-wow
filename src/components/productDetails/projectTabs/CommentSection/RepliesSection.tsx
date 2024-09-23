import React, { useEffect, useState } from 'react'

import { useProjectDetails } from "src/context/useProjectDetails";

import { ReplyModel } from 'src/interfaces/models/reply'
import { UserModel } from 'src/interfaces/models/user'

import { getUserById } from 'src/services/apiService/users/getUserById'

type Props = {
    data: ReplyModel  
}

const FormatDateSinceWhen = (date: string | undefined ):string  =>{
    const now = new Date()
    const created = date != undefined ? new Date(date) : new Date()
    const diff = now.getTime() - created.getTime()
    const diffInDays = diff / (1000 * 3600 * 24)
    return `${Math.round(diffInDays)} days ago`
} 


export default function RepliesSection({data}: Props) {
    const { UserInfo } = useProjectDetails()

    const [user, setUser] = useState<Partial<UserModel>>()

    const OnGetUser = async (authorId : string)=>{
        const response = await getUserById(authorId)
        if (response.data && response.status === 200){
            // console.log(response.data)
            setUser(response.data);
        }
    }

    useEffect(()=>{
        if (data.authorId){
            OnGetUser(data.authorId)
        }
    },[data.authorId])


    return (
        <>
            <div className='flex flex-row bg-orange-100 border border-orange-300 rounded-xl ml-[2vw] h-full'>
                <span className={`w-[1vw] min-h-fit ${UserInfo.uid === data.authorId ? "bg-orange-400": "bg-orange-300"} rounded-l-lg block`}>

                </span>
                <div className='p-4 w-full'>
                    <div className='flex flex-row justify-between items-center'>
                        {
                            user?.username && 
                            <div className='flex flex-row gap-x-[2vw] items-center'>
                                <div className='w-[3.5vw] rounded-full'>
                                    <img
                                        src={user.profileImageUrl}
                                        alt={user.username} 
                                        className='rounded-full'
                                    />
                                </div>
                                <div>
                                    <div className='flex flex-row gap-x-[2vw] items-center justify-center'>
                                        <span>
                                            <h3 className='hover:underline text-xl font-normal '>
                                                {user.username}
                                            </h3>
                                            <p>
                                                {FormatDateSinceWhen(user.birthDate)}
                                            </p>                                        
                                        </span>
                                        <span className='flex items-center'>
                                            {
                                                UserInfo.uid === data.authorId ? 
                                                <p className='text-orange-100 bg-orange-500 px-[1vw] py-[0.5vh] rounded-xl hover:opacity-80'>
                                                    Creator
                                                </p> 
                                                :
                                                <p className='text-orange-100 bg-orange-300 px-[1vw] py-[0.5vh] rounded-xl hover:opacity-80'>
                                                    Supporter
                                                </p>
                                            }
                                        </span>
                                    </div>

                                </div>
                            </div>
                        }
                        <div className='flex flex-end '>
                            <span>
                                <p className='text-gray-600 '>
                                    posted {FormatDateSinceWhen(data.createAt)}
                                </p>
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className='text-lg font-light px-[1vw]'>
                            {data.detail}
                        </p>
                    </div>  
                </div>

            </div>  
        </>
    )
}