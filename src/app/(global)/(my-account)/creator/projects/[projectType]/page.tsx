"use client";

import React, { useEffect } from "react";
import ProjectsList from "src/components/account/creator/ProjectsList";
import { ProjectsCreatedByCreatorProvider, useProjectsCreatedByCreator } from "src/context/creatorDashboard/useProjectsCreatedByCreator";

export default function Page({ params }: { params: { projectType: string } }) {
  const projectType = params.projectType;
 

  return (
    <section className="px-[4vw]">
      <ProjectsCreatedByCreatorProvider projectType={projectType}>
        <ProjectsList projectType={projectType} />
      </ProjectsCreatedByCreatorProvider>
    </section>
  );
}
