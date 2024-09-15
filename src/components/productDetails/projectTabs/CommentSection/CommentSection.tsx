import React, { useEffect, useState } from 'react'

import { useProjectDetails } from 'src/context/custom-hooks/useProjectDetails'

import { getUserById } from 'src/services/apiService/users/getUserById'

import { CommentModel } from 'src/interfaces/models/comment'
import { UserModel } from 'src/interfaces/models/user'
import RepliesSection from './RepliesSection'

type Props = {
    key : string 
    data : Partial<CommentModel>
    type : string  
}

const FormatDateSinceWhen = (date: string | undefined ):string  =>{
    const now = new Date()
    const created = date != undefined ? new Date(date) : new Date()
    const diff = now.getTime() - created.getTime()
    const diffInDays = diff / (1000 * 3600 * 24)
    return `${Math.round(diffInDays)} days ago`
} 

export default function CommentSection({ key , data , type }: Props) {
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
        <div 
            key={key}
            className='flex flex-col w-full bg-orange-200 px-[2vw] py-[2vh] gap-y-[3vh]'
        >   
            <div className='bg-orange-100 p-4 border border-orange-300 rounded-xl'>
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
                                <div className='flex flex-row gap-x-[2vw] items-center'>
                                    <h3 className='hover:underline text-xl font-normal '>
                                        {user.username}
                                    </h3>
                                    <span>
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
                                <p>
                                    {FormatDateSinceWhen(data.createAt)}
                                </p>
                            </div>
                        </>
                    }
                </div>
                <div>
                    <p className='text-lg font-light px-[1vw]'>
                        {data.detail}
                    </p>
                </div>                
            </div>
            {
                data.replyIds && data.replyIds.length > 0 &&
                data.replyIds.map((e) => {
                    return(
                        <RepliesSection key={e} repliesId={e}/>
                    )
                })
            }
                <>
                    <div className='flex flex-row bg-orange-100 border border-orange-300 rounded-xl ml-[2vw] h-full'>
                        <span className={`w-[1vw] min-h-fit ${UserInfo.uid === data.authorId ? "bg-orange-400": "bg-orange-300"} rounded-l-lg block`}>

                        </span>
                        <div className='p-4'>
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
                                        <div className='flex flex-row gap-x-[2vw] items-center'>
                                            <h3 className='hover:underline text-xl font-normal '>
                                                {user.username}
                                            </h3>
                                            <span>
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
                                        <p>
                                            {FormatDateSinceWhen(data.createAt)}
                                        </p>
                                    </div>
                                </>
                            }
                            </div>
                            <div>
                                <p className='text-lg font-light px-[1vw]'>
                                    {data.detail}
                                </p>
                            </div>  
                        </div>

                    </div>  
                </>
        </div>
    )
}