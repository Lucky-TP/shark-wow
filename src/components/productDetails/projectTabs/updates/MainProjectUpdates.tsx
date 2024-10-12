import React, { useEffect, useState } from "react";

import { useProjectDetails } from "src/context/useProjectDetails";

import UpdateBlog from "./UpdateBlog";

import { Update } from "src/interfaces/models/project";
import { Divider } from "antd";

export default function MainProjectUpdates() {
    const { ProjectInfo, isLoading } = useProjectDetails();

    const [currentUpdate, setUpdateState] = useState(0);
    return (
        <section className="flex flex-row w-full gap-x-[2vw] px-[5vw]">
            <nav className="flex flex-col  min-w-fit items-center">
                <h1 className="text-2xl font-semibold  mb-[3vh]">Progression</h1>
                <ul className="flex flex-col gap-y-[3vh] max-w-[27vw]">
                    {ProjectInfo.update &&
                        ProjectInfo.update.map((update, index) => (
                            <li
                                key={update.id}
                                onClick={() => {
                                    setUpdateState(index);
                                }}
                                className={`flex items-center justify-center p-3 bg-orange-50 rounded-xl w-full px-[1vw] shadow-lg
                                    hover:bg-orange-100  ${currentUpdate === index ? "bg-orange-100" : "bg-orange-50"}`}
                            >
                                <p className="text-lg text-gray-700 font-medium text-center">
                                    {update.detail}
                                </p>
                            </li>
                        ))}
                    {ProjectInfo.update && ProjectInfo.update.length === 0 && (
                        <li
                            className="flex items-center justify-center p-3 bg-orange-300 rounded-xl w-full px-[1vw] shadow-lg
                                  hover:bg-orange-100 cursor-pointer "
                        >
                            <p className="text-lg text-gray-700 font-medium text-center">
                                There are no updates currently.
                            </p>
                        </li>
                    )}
                </ul>
            </nav>
            <Divider type="vertical" className="h-full flex mx-[2vw] bg-gray-700" />
            <div className="w-full">
                {!isLoading && ProjectInfo.update && ProjectInfo.update.length > 0 && (
                    <UpdateBlog data={ProjectInfo?.update[currentUpdate]} />
                )}
                {!isLoading && ProjectInfo.update?.length === 0 && (
                    <section className="w-full">
                        <div
                            className="flex flex-col items-center justify-center text-center bg-orange-100 w-full min-h-[60vh] px-[2vw] py-[3vh]
                        rounded-lg  hover:shadow-xl hover:scale-[1.02] hover:bg-orange-200 border border-orange-200 shadow-xl
                        transition-all duration-700 hover:translate-y-[-1vh] cursor-pointer"
                        >
                            <p className="text-3xl font-medium">
                                Waiting for creator update there progress.
                            </p>
                        </div>
                    </section>
                )}
            </div>
        </section>
    );
}
