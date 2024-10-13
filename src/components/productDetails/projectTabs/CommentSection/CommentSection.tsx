import React, { useEffect, useState } from 'react'

import { useProjectDetails } from "src/context/useProjectDetails";

import AddReplySection from './AddReplySection'
import RepliesSection from './RepliesSection'

import { getUserById } from 'src/services/apiService/users/getUserById'

import { UserData } from 'src/interfaces/datas/user'
import { CommentData } from 'src/interfaces/datas/comment'

import { Skeleton } from 'antd'

import Link from "next/link";

type Props = {
    key : string 
    data : Partial<CommentData>
}


/*
const FormatDateSinceWhen = (date: string | undefined): string => {
    const now = new Date()
    const created = date != undefined ? new Date(date) : new Date()
    const diff = now.getTime() - created.getTime()
    const diffInDays = diff / (1000 * 3600 * 24)
    return `${Math.round(diffInDays)} days ago`
}
*/

const FormatDateSinceWhenV2 = (date: string | undefined): string => {
    const now = new Date();
    const created = date !== undefined ? new Date(date) : new Date();

    const nowDate = now.getDate();
    const createdDate = created.getDate();
    const nowMonth = now.getMonth();
    const createdMonth = created.getMonth();
    const nowYear = now.getFullYear();
    const createdYear = created.getFullYear();

    const diff = now.getTime() - created.getTime();
    const diffInMinutes = diff / (1000 * 60);
    const diffInHours = diffInMinutes / 60;

    // Handle "recently", "minutes ago", and "hours ago" cases
    if (diffInMinutes < 1) {
        return "posted recently";
    } else if (diffInMinutes < 60) {
        const roundedMinutes = Math.round(diffInMinutes);
        return `posted ${roundedMinutes} minute${roundedMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
        const roundedHours = Math.round(diffInHours);
        return `posted ${roundedHours} hour${roundedHours > 1 ? "s" : ""} ago`;
    }

    // Handle "yesterday" by comparing day, month, and year
    if (nowYear === createdYear && nowMonth === createdMonth && nowDate - createdDate === 1) {
        return "posted yesterday";
    }

    // Handle "2 days ago" and "3 days ago" by comparing day difference
    const dayDiff = nowDate - createdDate;

    if (nowYear === createdYear && nowMonth === createdMonth) {
        if (dayDiff === 2) {
            return "posted 2 days ago";
        } else if (dayDiff === 3) {
            return "posted 3 days ago";
        }
    }

    // For posts more than 3 days ago, return the formatted date with day before month
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };
    return `posted on ${created.toLocaleDateString("en-GB", options)}`; // 'en-GB' for DD/MM/YYYY format
};

export default function CommentSection({ key , data }: Props) {
    const { UserInfo ,isLoading} = useProjectDetails()

    const [user, setUser] = useState<Partial<UserData>>()

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
        <div key={key} className="flex w-full flex-col gap-y-[3vh] bg-orange-200 px-[2vw] py-[2vh]">
            <div className="rounded-xl border border-orange-300 bg-orange-100 p-4">
                <div className="flex flex-row items-center justify-between">
                    {user?.username && (
                        <div className="flex flex-row items-center gap-x-[2vw]">
                            <div className="aspect-square w-[3.5vw] overflow-hidden rounded-full">
                                <Link href={`/users/${user.uid}/profile`} passHref>
                                    <img
                                        src={user.profileImageUrl}
                                        alt={user.username}
                                        className="h-full w-full object-cover"
                                    />
                                </Link>
                            </div>
                            <div>
                                <div className="flex flex-row items-center justify-center gap-x-[2vw]">
                                    <span>
                                        <Link href={`/users/${user.uid}/profile`} passHref>
                                            <h3 className="text-xl font-normal hover:underline">
                                                {user.username}
                                            </h3>
                                        </Link>
                                    </span>
                                    <span className="flex items-center">
                                        {UserInfo.uid === data.authorId ? (
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
                    <div className="flex-end flex">
                        <span>
                            <p className="text-gray-600">{FormatDateSinceWhenV2(data.createAt)}</p>
                        </span>
                    </div>
                </div>
                <div>
                    <p className="px-[1vw] pt-2 text-lg font-light">{data.detail}</p>
                </div>
            </div>
            {user?.username &&
                data.replys &&
                data.replys.length > 0 &&
                data.replys.map((e) => {
                    return <RepliesSection key={e.replyId} data={e} />;
                })}
            {user && data && (
                <AddReplySection currentUser={user as UserData} parentComment={data.commentId} />
            )}
            {isLoading && <Skeleton active />}
        </div>
    );
}