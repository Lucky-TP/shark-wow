import React, { use } from "react";

import { useProjectDetails } from "src/context/custom-hooks/useProjectDetails";

type Props = {};

export default function MainProjectStory({}: Props) {
    const { ProjectInfo, isLoading, error } = useProjectDetails();
    return (
        <section className="flex flex-row w-full ">
            <section className="flex items-center justify-center px-[3vw] w-full" >
                <div
                    className={`flex flex-col items-center bg-orange-100 px-[5vw] py-[4vh] w-full min-h-[100vh] h-fit
                                rounded-lg  hover:shadow-xl  hover:bg-orange-200 border border-orange-200 shadow-xl 
                                transition-all duration-700 hover:translate-y-[-1vh] cursor-pointer ${isLoading && "animate-pulse"}`}
                >
                    {!isLoading && (
                        <>
                            <h3 className="">
                                <div
                                    className="ql-editor !p-0 preview-content mt-20"
                                    dangerouslySetInnerHTML={{
                                        __html: ProjectInfo?.story || "",
                                    }}
                                />
                            </h3>
                        </>
                    )}
                </div>
            </section>
        </section>
    );
}
