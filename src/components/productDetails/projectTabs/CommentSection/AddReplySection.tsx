
import React, { useState } from 'react'

import { useForm, SubmitHandler ,Controller, set } from "react-hook-form"

import { useProjectDetails } from 'src/context/custom-hooks/useProjectDetails';

import { addReplyToComment } from 'src/services/apiService/replies/addReplyToComment';

import { UserData } from 'src/interfaces/datas/user'
import { CreateCommentPayload } from 'src/interfaces/payload/commentPayload';

import { Input } from 'antd';
import { FaReply } from "react-icons/fa";


type Props = {
    currentUser : UserData
    parentComment : string | undefined
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

export default function AddReplySection({ currentUser , parentComment }: Props) {
    const { UserInfo , ProjectInfo , OnReFetchingData} = useProjectDetails();
    const [disable,setDisable] = useState<boolean>(false)
    const { 
        reset,
        register, 
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

    const OnCreatingReply : SubmitHandler<IFormInput> = async (data) => {
        try{
            if (parentComment){ 
                const payload : CreateCommentPayload = {
                    detail : data.commentDetails
                }
                setDisable(true)
                await addReplyToComment(parentComment,payload)
                reset()
                setDisable(false)

            }
        } catch (err) {
            setDisable(false)
            console.log(err)
        }
    }

    return (
        <div className='flex flex-row w-full bg-orange-200 py-[1.5vh] pl-[2vw]'> 
            <div className='flex flex-row w-full'>
                <div className='w-[1vw] min-h-fit bg-orange-300 rounded-l-lg block'/>  
                <div className='flex flex-col  bg-orange-100 p-4 border border-orange-300 rounded-r-xl w-full gap-y-[2vh]'>
                    <div className='flex flex-row gap-x-[2vw] w-full'>
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
                        onSubmit={handleSubmit(OnCreatingReply)}
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
                                        placeholder={`Reply to this comment here...`}
                                        className='w-full'
                                    />
                                )}
                            />
                            {errors.commentDetails && (
                                <p className="text-red-500">This field is required.</p>
                            )}                             
                        </div>
                        <div className='flex w-full justify-end'>
                            <button
                                type="submit"
                                className='flex flex-end  text-orange-50 bg-orange-400 px-[1.5vw] py-[1vh] rounded-lg hover:scale-[1.01] hover:bg-orange-500 duration-700 transition-all'
                                disabled={disable}
                            >
                                <FaReply/>
                            </button>   
                        </div>
                    </form>
                </div>

        </div>
    </div>
    )
}