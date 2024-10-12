"use client";

import React, { useEffect } from "react";
import ProjectsList from "src/components/account/creator/ProjectsList";
import ProjectStatusDropdown from "src/components/account/creator/ProjectStatusDropdown";
import { ProjectsCreatedByCreatorProvider, useProjectsCreatedByCreator } from "src/context/creatorDashboard/useProjectsCreatedByCreator";

export default function Page({ params }: { params: { projectType: string } }) {
  const projectType = params.projectType;
 

  return (
    <section className="px-[4vw]">
      <ProjectsCreatedByCreatorProvider projectType={projectType}>
        <ProjectStatusDropdown status={projectType}/>
        <ProjectsList projectType={projectType}/>
      </ProjectsCreatedByCreatorProvider>
    </section>
  );
}
