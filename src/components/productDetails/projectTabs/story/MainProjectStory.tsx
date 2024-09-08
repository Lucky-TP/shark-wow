import React, { use } from "react";

import { useProjectDetails } from "src/context/custom-hooks/useProjectDetails";

type Props = {};

export default function MainProjectStory({}: Props) {
    const { ProjectInfo, isLoading, error } = useProjectDetails();
    return (
        <section className="flex flex-row w-full ">
            <section className="flex items-center justify-center px-[3vw] w-full">
                <div
                    className={`flex flex-col items-center text-center bg-orange-100 w-10/12 px-[5vw] py-[3vh]
              rounded-lg  hover:shadow-xl hover:scale-[1.02] hover:bg-orange-200 border border-orange-200 shadow-xl
              transition-all duration-700 hover:translate-y-[-1vh] cursor-pointer ${isLoading && "animate-pulse w-[70vh]"}`}
                >
                    {!isLoading && (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-700">
                                Story
                            </h2>
                            <h3 className="">
                                <div
                                    className="ql-editor !p-0 preview-content mt-20"
                                    dangerouslySetInnerHTML={{
                                        __html: ProjectInfo?.story || "",
                                    }}
                                />

                                {/* {ProjectInfo?.story === "" ? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ea, minus dolor commodi voluptatibus ipsum veritatis consequatur quis suscipit illum aperiam nihil deserunt, amet quae eligendi vel, aliquid culpa sit."
                      : ProjectInfo?.story}                   */}
                            </h3>
                        </>
                    )}
                </div>
            </section>
        </section>
    );
}
