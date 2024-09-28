import { useEffect } from 'react';
import { useProjectsCreatedByCreator } from 'src/context/creatorDashboard/useProjectsCreatedByCreator';
import ProjectsDrafted from './ProjectsDrafted';
import ProjectsLaunched from './ProjectsLaunched';
import LoadingSection from 'src/components/global/LoadingSection';
import ProjectsEnd from './ProjectsEnd';

type Props = {
  projectType: string; // projectType prop passed into the component
};

export default function ProjectsList({ projectType }: Props) {
  const { payload, OnGettingProjectCreatedByCreator } = useProjectsCreatedByCreator();

  // Fetch data when the component is mounted
  useEffect(() => {
    OnGettingProjectCreatedByCreator();
  }, []); // Empty dependency array ensures this only runs once on mount

  if (payload.isLoading) {
    return <LoadingSection />;
  }

  if (payload.error) {
    return <div>Error loading projects</div>;
  }

  return (
    <div>
      {/* Render based on the current project type in payload or fallback to prop */}
      {(projectType === "launched") && <ProjectsLaunched />}
      {(projectType === "drafted") && <ProjectsDrafted />}
      {(projectType === "end") && <ProjectsEnd />}
      {!projectType && <div>No project type selected</div>}
    </div>
  );
}
