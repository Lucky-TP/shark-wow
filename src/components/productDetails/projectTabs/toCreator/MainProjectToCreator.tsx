
import React, { useEffect, useState } from "react";

import Link from "next/link";

import { getSelf } from "src/services/apiService/users/getSelf";

import { useProjectDetails } from "src/context/custom-hooks/useProjectDetails";
import CommentSection from "../CommentSection/CommentSection";
import AddCommentSection from "../CommentSection/AddCommentSection";

import { UserData } from "src/interfaces/datas/user";
import { CommentData } from "src/interfaces/datas/comment";

import { Skeleton } from "antd";
import { getCommentsWithReplies } from "src/services/apiService/comments/getCommentsWithReplies";

type Props = {};

type UserStatusType = { 
    isLoading : boolean ;
    data : UserData ;
    isValid : boolean ;
}

export default function MainProjectToCreator({}: Props) {
    const { UserInfo } = useProjectDetails();
    const [ currentUserStatus , setCurrentUserStatus ] = useState<UserStatusType>({
        isLoading : true ,
        data : {} as UserData ,
        isValid : false
    }) ; 
    const [comments, setComments] = useState<CommentData[]>([])

    const OnGetSelfUser = async () => {
        try{
            const response = await getSelf();
            if (response.data && response.status === 200){
                setCurrentUserStatus({
                    ...currentUserStatus,
                    data : response.data,
                    isValid : true,
                    isLoading : false
                })        
            }
        }catch(err:any){
            
            setCurrentUserStatus({
                ...currentUserStatus,
                isValid : false,
                isLoading : false
            })
        }
    }

    const OnGettingComments = async ()=>{
        try{
            if (UserInfo.uid){
                const response = await getCommentsWithReplies(UserInfo.uid,"user")
                setComments(response.comments)
                console.log(response.comments)
            }
        }catch(err :any) { 
            console.log(err)
        }
    }

    useEffect(()=>{
        const fetchInitialData = async () => {
            await OnGettingComments();
            await OnGetSelfUser(); // Make sure both are awaited independently
        };
        fetchInitialData();
    },[])

    return (
        <section className="flex flex-col items-center justify-center w-full gap-y-[3vh] ">
            <div className="flex flex-col w-[70vw] items-center">
                {currentUserStatus.isLoading && <Skeleton active />}
                {!currentUserStatus.isLoading && currentUserStatus.isValid &&  <AddCommentSection currentUser={currentUserStatus.data} type="to-creator"/>}
                {!currentUserStatus.isLoading && !currentUserStatus.isValid &&
                    <div className="flex flex-col w-[70vw] items-center">                    
                        <div className="bg-orange-200 w-full py-[1vh] text-center text-xl text-gray-600">
                            <Link href='/sign-in' className="hover:text-orange-600 hover:underline">
                                Sign in to comment                           
                            </Link>
                        </div>
                    </div>
                }                
            </div>

            {!currentUserStatus.isLoading && comments.length > 0 && 
                <div className="flex flex-col w-[70vw] items-center">
                    {
                        comments.reverse().map((e) => (
                            <CommentSection key={e.commentId} data={e} isValid={currentUserStatus.isValid}/>
                        ))
                    }
                </div>
            }
            {currentUserStatus.isLoading && comments.length < 0 && 
                <Skeleton active/> 
            }
        </section>
    );
}

