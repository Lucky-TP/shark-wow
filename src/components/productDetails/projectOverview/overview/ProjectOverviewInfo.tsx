import React, { useEffect, useState } from "react";

import {
    ProjectDetailPayloadInterface,
    useProjectDetails,
} from "src/context/useProjectDetails";

import { message, Skeleton } from "antd";

function formatDate(date: string ): string {
    const DateO = new Date(date)
    const day = String(DateO.getDate()).padStart(2, '0');
    const month = String(DateO.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = DateO.getFullYear();

    return `${day}/${month}/${year}`;
}


export default function ProjectOverviewInfo() {
    const { isLoading, ProjectInfo, UserInfo, error, OnGettingUserDetails } =
        useProjectDetails() as ProjectDetailPayloadInterface;

    const [isFirstTime, setFirstTime] = useState(true);

    useEffect(() => {
        if (ProjectInfo.uid && OnGettingUserDetails) {
            OnGettingUserDetails(ProjectInfo.uid);
            setFirstTime(false);
        }
    }, [ProjectInfo.uid]);

    return (
        <>
            {(isLoading || isFirstTime) && (
                <>
                    <Skeleton avatar paragraph={{ rows: 0 }} />
                    <Skeleton paragraph={{ rows: 3 }} />
                </>
            )}
            {!isLoading && (
                <>
                    <div className="flex flex-row items-center gap-x-[2vw]">
                        <div className="rounded-full">
                            <a href={`/users/${UserInfo.uid}/profile`}>
                                <img
                                    src={UserInfo.profileImageUrl}
                                    className="max-w-[3vw] cursor-pointer rounded-full"
                                    alt="Profile"
                                />
                            </a>
                        </div>
                        <div className="ml-4">
                            <a
                                href={`/users/${UserInfo.uid}/profile`}
                                className="cursor-pointer text-xl font-bold hover:underline focus:underline"
                            >
                                {UserInfo.username}
                            </a>
                            <p className="text-base text-gray-600">
                                Created at{" "}
                                {ProjectInfo.startDate ? formatDate(ProjectInfo.startDate) : ""}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{ProjectInfo.name}</h1>
                        <p className="mb-4 text-gray-600">{ProjectInfo.description}</p>
                    </div>
                </>
            )}
            {error && message.error("User details")}
        </>
    );
}
