import React, { useEffect, useState } from 'react'

import { getUserById } from 'src/services/apiService/users/getUserById'

import { CommentModel } from 'src/interfaces/models/comment'
import { UserModel } from 'src/interfaces/models/user'

type Props = {
    key : string 
    data : Partial<CommentModel>
    type : string  
}

export default function CommentSection({ key , data , type }: Props) {

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
        <div 
            key={key}
            className='flex flex-col w-full bg-orange-200 px-[2vw] py-[2vh] h-[]'
        >   
            <div className='bg-orange-100 p-4'>
                <div className='flex flex-row gap-x-[2vw]'>
                    {
                        user?.username && 
                        <>
                            <div className='w-[3.5vw] rounded-full'>
                                <img
                                    src={user.profileImageUrl}
                                    alt={user.username} 
                                    className='rounded-full'
                                />
                            </div>
                            <div>
                                <h3 className='hover:underline text-xl font-normal '>
                                    {user.username}
                                </h3>
                                <p>
                                    {data.createAt}
                                </p>
                            </div>
                        </>
                    }
                </div>
                <div>
                    <p className='text-lg font-light'>
                        {data.detail}
                    </p>
                
                </div>                
            </div>
        </div>
    )
}