
import React from 'react'

import { useForm, SubmitHandler , Controller} from "react-hook-form"

import { useProjectDetails } from 'src/context/custom-hooks/useProjectDetails';
import { addCommentToProject } from 'src/services/apiService/comments/addCommentToProject';


import { UserData } from 'src/interfaces/datas/user'
import { CreateCommentPayload } from 'src/interfaces/payload/commentPayload';

import { Input } from 'antd';
import { FaComment } from "react-icons/fa";
import { addCommentToUser } from 'src/services/apiService/comments/addCommentToUser';


type Props = {
    type : string 
    currentUser : UserData
}

interface IFormInput {
    commentDetails: string
    type : string 
  }

const FormatDateSinceWhen = (date: string | undefined ):string  =>{
    const now = new Date()
    const created = date != undefined ? new Date(date) : new Date()
    const diff = now.getTime() - created.getTime()
    const diffInDays = diff / (1000 * 3600 * 24)
    return `${Math.round(diffInDays)} days ago`
} 

export default function AddCommentSection({currentUser , type  }: Props) {
    const { UserInfo , ProjectInfo , OnReFetchingData} = useProjectDetails();

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

    const OnCreatingComment : SubmitHandler<IFormInput> = async (data) => {
        try{
            if (ProjectInfo.projectId && UserInfo.uid){ 
                const payload : CreateCommentPayload = {
                    detail : data.commentDetails
                }
                type ===  "project" ?
                addCommentToProject(ProjectInfo.projectId, payload) : 
                addCommentToUser(UserInfo.uid, payload)
                reset()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col w-full bg-orange-200 px-[2vw] py-[1.5vh]'>   
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
                    className='flex flex-col gap-y-[1vh]'
                >
                        <div>
                            <Controller
                                name="commentDetails"  // Fix the name to match your form input
                                control={control}
                                rules={{
                                    required: 'This field is required.',
                                }}
                                render={({ field }) => (
                                    <Input.TextArea
                                        {...field}
                                        placeholder={`Write your comment to ${type === "project" ? "project" : "creator"} here...`}
                                        className='w-full'
                                    />
                                )}
                            />
                            {errors.commentDetails && (
                                <p className="text-red-500">This field is required.</p>
                            )}                             
                        </div>
                    <div className='flex w-full justify-end'>
                        <button type="submit" className='flex flex-end  text-orange-50 bg-orange-400 px-[1.5vw] py-[1vh] rounded-lg hover:scale-[1.01] hover:bg-orange-500 duration-700 transition-all'>
                            <FaComment/>
                        </button>   
                    </div>
                </form>
            </div>
        </div>
    )
}