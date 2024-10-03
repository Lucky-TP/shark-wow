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
  const { payload, OnGettingProjectCreatedByCreator, OnChangeProjectStageType } = useProjectsCreatedByCreator();

  // Fetch data when the component is mounted
  useEffect(() => {
    OnGettingProjectCreatedByCreator();
  }, []);

  if (payload.isLoading) {
    console.log(payload.ProjectsCreatedByCreator)
    return <LoadingSection />;
  }

  // if (payload.error) {
  //   return <div>Error loading projects</div>;
  // }

  // Log the launched projects array
  // if (payload.ProjectsCreatedByCreator.launched && payload.ProjectsCreatedByCreator.launched.length > 0) {
  //   console.log("Launched Projects Array:", payload.ProjectsCreatedByCreator.launched);
  //   payload.ProjectsCreatedByCreator.launched.forEach((project, index) => {
  //     console.log(`Launched Project ${index + 1}:`, project);
  //   });
  // } else {
  //   console.log("No launched projects found.");
  // }
  console.log(payload.ProjectsCreatedByCreator)

  return (
    <div>

      {/* Render based on the current project type in payload or fallback to prop */}
      {projectType === "launched" && <ProjectsLaunched />}
      {projectType === "drafted" && <ProjectsDrafted />}
      {projectType === "ended" && <ProjectsEnd />}

      {!projectType && <div>No project type selected</div>}
    </div>
  );
}
