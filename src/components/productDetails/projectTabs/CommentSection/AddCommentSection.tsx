
import React from 'react'

import { useProjectDetails } from 'src/context/custom-hooks/useProjectDetails';
import { addCommentToProject } from 'src/services/apiService/comments/addCommentToProject';

import { Input } from 'antd';


import { UserData } from 'src/interfaces/datas/user'

type Props = {
    currentUser : UserData
}


const FormatDateSinceWhen = (date: string | undefined ):string  =>{
    const now = new Date()
    const created = date != undefined ? new Date(date) : new Date()
    const diff = now.getTime() - created.getTime()
    const diffInDays = diff / (1000 * 3600 * 24)
    return `${Math.round(diffInDays)} days ago`
} 

export default function AddCommentSection({currentUser}: Props) {
    const { UserInfo , ProjectInfo } = useProjectDetails();

    const OnCreatingComment = (details : string) => {
        if (!ProjectInfo.projectId) {
            return;
        }
        addCommentToProject(ProjectInfo.projectId, { detail: details });
    }

    return (
        <div className='flex flex-col w-full bg-orange-200 px-[2vw] py-[2vh] gap-y-[3vh]'>   
            <div className='bg-orange-100 p-4 border border-orange-300 rounded-xl w-full '>
                <div className='flex flex-row gap-x-[2vw]'>
                    {
                        currentUser?.username && 
                        <>
                            <div className='w-[3.5vw] rounded-full'>
                                <img
                                    src={currentUser.profileImageUrl}
                                    alt={currentUser.username} 
                                    className='rounded-full'
                                />
                            </div>
                            <div>
                                <div className='flex flex-row gap-x-[2vw] items-center'>
                                    <h3 className='hover:underline text-xl font-normal '>
                                        {currentUser.username}
                                    </h3>
                                    <span>
                                        {
                                            UserInfo.uid === currentUser.uid ? 
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
                                    {FormatDateSinceWhen(currentUser.birthDate)}
                                </p>
                            </div>
                        </>
                    }
                </div>
                <div>
                    <Input.TextArea/>
                </div>
            </div>
        </div>
    )
}