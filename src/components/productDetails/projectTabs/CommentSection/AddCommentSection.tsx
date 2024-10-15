
import React, { useEffect, useState } from 'react'

import { useForm, SubmitHandler , Controller, set} from "react-hook-form"

import { useProjectDetails } from "src/context/useProjectDetails";
import { addCommentToProject } from 'src/services/apiService/comments/addCommentToProject';


import { UserData } from 'src/interfaces/datas/user'
import { CreateCommentPayload } from 'src/interfaces/payload/commentPayload';

import { Input, message } from 'antd';
import { FaComment } from "react-icons/fa";
import { addCommentToUser } from 'src/services/apiService/comments/addCommentToUser';

import Link from 'next/link';


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
    const { UserInfo , ProjectInfo , UserStatus , OnReFetchingData} = useProjectDetails();

    const [disable,setDisable] = useState<boolean>(false)

    const { 
        reset,
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
            if (UserStatus === 3){
                message.error('You are not supporters of this project')
                reset()
                return
            }else if (ProjectInfo.projectId && UserInfo.uid ){
                const payload : CreateCommentPayload = {
                    detail : data.commentDetails
                }
                type ===  "project" ? addCommentToProject(ProjectInfo.projectId, payload) : addCommentToUser(UserInfo.uid, payload)
                reset()
                window.location.reload()
            }
        } catch (err) {
            setDisable(false)
        }
    }

    return (
        <div className="flex w-full flex-col bg-orange-200 px-[2vw] py-[1.5vh]">
            <div className="flex w-full flex-col gap-y-[2vh] rounded-xl border border-orange-300 bg-orange-100 p-4">
                <div className="flex flex-row items-center justify-between">
                    {currentUser?.username && (
                        <div className="flex flex-row items-center gap-x-[2vw]">
                            <div className="aspect-square w-[3.5vw] overflow-hidden rounded-full">
                                <Link href={`/users/${currentUser.uid}/profile`} passHref>
                                    <img
                                        src={currentUser.profileImageUrl}
                                        alt={currentUser.username}
                                        className="h-full w-full object-cover"
                                    />
                                </Link>
                            </div>
                            <div>
                                <div className="flex flex-row items-center justify-center gap-x-[2vw]">
                                    <span>
                                        <Link href={`/users/${currentUser.uid}/profile`} passHref>
                                            <h3 className="text-xl font-normal hover:underline">
                                                {currentUser.username}
                                            </h3>
                                        </Link>
                                    </span>
                                    <span className="flex items-center">
                                        {UserInfo.uid === currentUser.uid ? (
                                            <p className="rounded-xl bg-orange-500 px-[1vw] py-[0.5vh] text-orange-100 hover:opacity-80">
                                                Creator
                                            </p>
                                        ) : (
                                            <p className="rounded-xl bg-orange-300 px-[1vw] py-[0.5vh] text-orange-100 hover:opacity-80">
                                                Supporter
                                            </p>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <form
                    onSubmit={handleSubmit(OnCreatingComment)}
                    className="flex flex-col gap-y-[1vh]"
                >
                    <div>
                        <Controller
                            name="commentDetails" // Fix the name to match your form input
                            control={control}
                            rules={{
                                required: "This field is required.",
                            }}
                            render={({ field }) => (
                                <Input.TextArea
                                    {...field}
                                    placeholder={`Write your comment to ${type === "project" ? "project" : "creator"} here...`}
                                    className="w-full"
                                />
                            )}
                        />
                        {errors.commentDetails && (
                            <p className="text-red-500">This field is required.</p>
                        )}
                    </div>
                    <div className="flex w-full justify-end">
                        <button
                            type="submit"
                            className="flex-end flex rounded-lg bg-orange-400 px-[1.5vw] py-[1vh] text-orange-50 transition-all duration-700 hover:scale-[1.01] hover:bg-orange-500"
                            disabled={disable}
                        >
                            <FaComment />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}