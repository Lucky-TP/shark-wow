import React, { useEffect, useState } from "react";

import { getSelf } from "src/services/apiService/users/getSelf";

import { useProjectDetails } from "src/context/custom-hooks/useProjectDetails";
import CommentSection from "../CommentSection/CommentSection";
import AddCommentSection from "../CommentSection/AddCommentSection";

import { UserData } from "src/interfaces/datas/user";

import { Skeleton } from "antd";

type Props = {};

type UserStatusType = { 
    isLoading : boolean ;
    data : UserData ;
    isValid : boolean ;
}

export default function MainProjectDiscussion({}: Props) {
    const { ProjectInfo } = useProjectDetails();
    const [ currentUserStatus , setCurrentUserStatus ] = useState<UserStatusType>({
        isLoading : true ,
        data : {} as UserData ,
        isValid : false
    }) ; 

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
    
    useEffect(()=>{
        OnGetSelfUser()
    },[])

    return (
        <section className="flex flex-col items-center justify-center w-full gap-y-[3vh] ">
            <div className="flex flex-col w-[70vw] items-center">
                {currentUserStatus.isLoading && <Skeleton active />}
                {!currentUserStatus.isLoading && currentUserStatus.isValid &&   <AddCommentSection currentUser={currentUserStatus.data}/>}
                {!currentUserStatus.isLoading && !currentUserStatus.isValid &&   <p>Sign in first</p>}                
            </div>

            {ProjectInfo.discussion && ProjectInfo.discussion.length > 0 && 
                <div className="flex flex-col w-[70vw] items-center">
                    {
                        ProjectInfo.discussion.map((e) => (
                            <CommentSection key={e.authorId} data={e} type="discusstion"/>
                        ))
                    }
                </div>
            }
        </section>
    );
}
