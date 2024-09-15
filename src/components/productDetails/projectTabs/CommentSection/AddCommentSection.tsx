
import React from 'react'

import { useForm, SubmitHandler , Controller} from "react-hook-form"

import { useProjectDetails } from 'src/context/custom-hooks/useProjectDetails';
import { addCommentToProject } from 'src/services/apiService/comments/addCommentToProject';


import { UserData } from 'src/interfaces/datas/user'
import { CreateCommentPayload } from 'src/interfaces/payload/commentPayload';

import { Input } from 'antd';
import { FaRegCommentDots } from "react-icons/fa6";


type Props = {
    currentUser : UserData
}

interface IFormInput {
    commentDetails: string
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

    const { 
        reset,
        // register, 
        handleSubmit, 
        control,
        formState: { errors }, 
    } = useForm<IFormInput>(
        {
            defaultValues:{
                commentDetails : ''
            }
        }
    )

    const OnCreatingComment : SubmitHandler<IFormInput> = (data) => {
        try{
            if (ProjectInfo.projectId) {
                console.log(data)
                const payload : CreateCommentPayload = {
                    detail : data.commentDetails
                }
                addCommentToProject(ProjectInfo.projectId, payload);
                reset()
            }
        }catch(err){
            console.log(err)
        }
 
    }

    return (
        <div className='flex flex-col w-full bg-orange-200 px-[2vw] py-[2vh]'>   
            <div className='flex flex-col bg-orange-100 p-4 border border-orange-300 rounded-xl w-full gap-y-[2vh]'>
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
                <form
                    onSubmit={handleSubmit(OnCreatingComment)}
                >
                    <Controller
                        name="commentDetails"  // Fix the name to match your form input
                        control={control}
                        rules={{
                            required: 'This field is required.',
                        }}
                        render={({ field }) => (
                            <Input.TextArea
                                {...field}
                                placeholder="Write your comment here..."
                                className='w-full'
                            />
                        )}
                    />
                    {errors.commentDetails && (
                        <p className="text-red-500">This field is required.</p>
                    )} 
                
                 

                    <button type="submit">
                        <FaRegCommentDots/>
                    </button>
                </form>
            </div>
        </div>
    )
}