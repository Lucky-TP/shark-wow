"use client";

import React, { useEffect } from "react";
import ProjectsList from "src/components/account/creator/ProjectsList";
import ProjectStatusDropdown from "src/components/account/creator/ProjectStatusDropdown";
import { ProjectsCreatedByCreatorProvider, useProjectsCreatedByCreator } from "src/context/creatorDashboard/useProjectsCreatedByCreator";
import { UserInfo } from 'src/components/account/UserInfo'
import { useUserData } from 'src/context/useUserData'

export default function Page({ params }: { params: { projectType: string } }) {
  const projectType = params.projectType;
  const { user, loading } = useUserData();
 

  return (
    <section >
      <UserInfo user={user || undefined} />
      <div className="px-[4vw]">
        <ProjectsCreatedByCreatorProvider projectType={projectType}>
          <ProjectStatusDropdown status={projectType}/>
          <ProjectsList projectType={projectType}/>
        </ProjectsCreatedByCreatorProvider>
      </div>
      
    </section>
  );
}
