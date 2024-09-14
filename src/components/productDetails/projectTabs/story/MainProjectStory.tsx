import React, { use } from "react";

import { useProjectDetails } from "src/context/custom-hooks/useProjectDetails";

type Props = {};

export default function MainProjectStory({}: Props) {
    const { ProjectInfo, isLoading, error } = useProjectDetails();
    return (
        <section className={`flex flex-row ${isLoading ? "w-full" : "w-7/12"} `}>
            <section className="flex justify-center w-full" >
                <div
                    className={`flex flex-col items-center bg-transparent px-[3vw] py-[5vh] w-full min-h-[100vh] h-fit
                                rounded-lg  hover:shadow-xl  hover:bg-orange-100 border border-orange-200 shadow-xl 
                                transition-all duration-700 cursor-pointer ${isLoading && "animate-pulse"}`}
                >
                    {!isLoading && (
                        <>
                            <h3 className="">
                                <div
                                    className="ql-editor !p-0 preview-content"
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
