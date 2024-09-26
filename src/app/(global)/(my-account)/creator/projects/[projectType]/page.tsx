"use client";

import React from "react";

import { ProjectsCreatedByCreatorProvider } from "src/context/creatorDashboard/useProjectsCreatedByCreator";

export default function Page({ params }: { params: { projectType: string } }) {
    const projectType = params.projectType;
  return (
    <section className="px-[4vw]">
        <ProjectsCreatedByCreatorProvider projectType={projectType}>
            <p>qwer</p>
        </ProjectsCreatedByCreatorProvider>
    </section>
  )
}