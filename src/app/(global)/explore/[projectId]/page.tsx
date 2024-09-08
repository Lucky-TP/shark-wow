"use client";

import React, { useEffect, useState } from "react";

import MainProjectOverview from "src/components/productDetails/projectOverview/MainProjectOverview";
import MainProjectTabs from "src/components/productDetails/projectTabs/MainProjectTabs";

import { ProjectDetailProvider } from "src/context/custom-hooks/useProjectDetails";

export default function Page({ params }: { params: { projectId: string } }) {
    const projectId = params.projectId;
    return (
        <ProjectDetailProvider projectId={projectId}>
            <section className="flex flex-col w-screen">
                <>
                    <MainProjectOverview />
                    <MainProjectTabs />
                </>
            </section>
        </ProjectDetailProvider>
    );
}
