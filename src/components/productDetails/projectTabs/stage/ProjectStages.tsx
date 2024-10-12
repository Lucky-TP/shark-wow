"use client";

import React, { useState, useEffect, useRef } from "react";

import { Stage } from "src/interfaces/models/project";

import TargetStage from "./TargetStage";

import { Skeleton } from "antd";

import { useProjectDetails } from "src/context/useProjectDetails";
import { dateToString } from "src/utils/date";

interface Stages {
    stages: Stage[];
    status: number;
    isLoading: boolean;
}

export default function ProjectStages() {
    const { ProjectInfo, isLoading, error } = useProjectDetails();
    return (
        <section className="items-center max-w-[30vw]  bg-orange-50 ">
            <ul
                className="flex flex-col items-center gap-y-[2vh] active:cursor-grabbing pt-[1vh] w-full  hide-scroll-bar"
            >
                {ProjectInfo.stages !== undefined &&
                    ProjectInfo.stages.map((stage: Stage, key) => (
                        <TargetStage key={key} stage={stage} />
                    )
                )}
                {(isLoading || ProjectInfo.stages === null) && (
                    <li>
                        <Skeleton active />
                    </li>
                )}
            </ul>
        </section>
    );
}
