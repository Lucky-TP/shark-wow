"use client";
import React, { useState } from "react";

import MainProjectStory from "./story/MainProjectStory";
import MainProjectStage from "./stage/ProjectStages";
import MainProjectUpdates from "./updates/MainProjectUpdates";
import MainProjectDiscussion from "./discussion/MainProjectDiscussion";
import MainProjectToCreator from "./toCreator/MainProjectToCreator";

export default function MainProjectTabs() {
    const [activeTab, setActiveTab] = useState("story");

    return (
        <section>
            <ul className="flex flex-row justify-between shadow-xl ">
                <li
                    className={` ${activeTab === "story" ? "bg-orange-200" : "bg-orange-100"}
                    w-full h-full flex items-center text-center justify-center py-[3vh] hover:bg-orange-200 cursor-pointer duration-500 transition-colors`}
                    onClick={() => setActiveTab("story")}
                >
                    <h2 className={`text-xl text-gray-600 font-semibold ${activeTab === "story" ? "text-orange-500" : "text-gray-600"}`}>Story</h2>
                </li>
                <li
                    className={` ${activeTab === "update" ? "bg-orange-200" : "bg-orange-100"}
                    w-full h-full flex items-center text-center justify-center py-[3vh] hover:bg-orange-200 cursor-pointer duration-500 transition-colors`}
                    onClick={() => setActiveTab("update")}
                >
                    <h2 className={`text-xl text-gray-600 font-semibold ${activeTab === "update" ? "text-orange-500" : "text-gray-600"}`}>Updates</h2>
                </li>
                <li
                    className={` ${activeTab === "discussion" ? "bg-orange-200" : "bg-orange-100"}
                    w-full h-full flex items-center text-center justify-center py-[3vh] hover:bg-orange-200 cursor-pointer duration-500 transition-colors`}
                    onClick={() => setActiveTab("discussion")}
                >
                    <h2 className={`text-xl text-gray-600 font-semibold ${activeTab === "discussion" ? "text-orange-500" : "text-gray-600"}`}>Discussion</h2>
                </li>
                <li
                    className={` ${activeTab === "to-creator" ? "bg-orange-200" : "bg-orange-100"}
                    w-full h-full flex items-center text-center justify-center py-[3vh] hover:bg-orange-200 cursor-pointer duration-500 transition-colors`}
                    onClick={() => setActiveTab("to-creator")}
                >
                    <h2 className={`text-xl text-gray-600 font-semibold ${activeTab === "to-creator" ? "text-orange-500" : "text-gray-600"}`}>To Creator</h2>
                </li>
            </ul>
            <section className="py-[3vh] bg-orange-50 min-h-[140vh] h-fit overflow-y-auto px-[3vw]">
                {activeTab === "story" && 
                    <section
                        className="flex flex-row  justify-center w-full gap-x-[2vw] "
                    >
                        <MainProjectStory key={0} />
                        <MainProjectStage key={1} />
                    </section>
                }
                {activeTab === "update" && <MainProjectUpdates key={2} />}
                {activeTab === "discussion" && <MainProjectDiscussion key={3} />}
                {activeTab === "to-creator" && <MainProjectToCreator key={4} />}
            </section>
        </section>
    );
}
