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
                    <div className="flex flex-row items-center gap-x-[2vw] ">
                        <div className="rounded-full">
                            <img
                                src={UserInfo.profileImageUrl}
                                className="rounded-full max-w-[3vw]"
                            />
                        </div>
                        <div className="ml-4">
                            <h2 className="text-xl font-bold">{UserInfo.username}</h2>
                            <p className="text-gray-600 text-base">
                                Created at {UserInfo.birthDate ? formatDate(UserInfo.birthDate) : ""}
                            </p>
                        </div>
                    </div>
                    <div>
                        {/* <div className="flex flex-row justify-between">
                            <h3 className="text-lg font-semibold">Current Stage :</h3>
                            <h3 className="text-lg font-semibold">
                                {ProjectInfo.stages && ProjectInfo.stages[1].name}
                            </h3>
                        </div> */}
                        <h1 className="text-2xl font-bold">{ProjectInfo.name}</h1>
                        <p className="text-gray-600 mb-4">{ProjectInfo.description}</p>
                    </div>
                </>
            )}
            {error && message.error("User details")}
        </>
    );
}
