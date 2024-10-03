import { createContext, useContext, useState, useCallback } from "react";
import { CreatorOwnProjects } from "src/interfaces/datas/user";
import { getCreatorOwnProjects } from "src/services/apiService/users/getCreatorOwnProjects";

// Enum for different project stages
export enum ProjectStagesType {
  drafted = "drafted",
  launched = "launched",
  failed = "failed",
  completed = "completed",
  default = "default",
}

// Define the context type
interface ProjectsCreatedByCreatorContextType {
  payload: ProjectsCreatedByCreatorType;
  OnGettingProjectCreatedByCreator: () => Promise<void>;
  OnChangeProjectStageType: (projectType: string) => void;
}

// Define the shape of the payload
interface ProjectsCreatedByCreatorType {
  ProjectsCreatedByCreator: CreatorOwnProjects;
  isLoading: boolean;
  error: string | boolean; // error can be a string for message or boolean
  currentProjectType: ProjectStagesType;
}

// Initialize the payload
const InitializeProjectsCreatedByCreator: ProjectsCreatedByCreatorType = {
  ProjectsCreatedByCreator: {} as CreatorOwnProjects,
  isLoading: false,
  error: false,
  currentProjectType: ProjectStagesType.default,
};

// Create the context
const ProjectsCreatedByCreatorContext = createContext<ProjectsCreatedByCreatorContextType | undefined>(undefined);

// The provider component
export function ProjectsCreatedByCreatorProvider({
  children,
  projectType,
}: {
  children: React.ReactNode;
  projectType: string;
}) {
  const [ProjectsCreatedByCreatorPayload, setProjectCreatedByCreatorPayload] = useState<ProjectsCreatedByCreatorType>(
    InitializeProjectsCreatedByCreator
  );

  // Fetch projects created by the creator
  const OnGettingProjectCreatedByCreator = useCallback(async () => {
    // Set loading state and reset error
    setProjectCreatedByCreatorPayload((prev) => ({
      ...prev,
      isLoading: true,
      error: false,
    }));

    try {
      const response = await getCreatorOwnProjects();

      // Update state with fetched data
      setProjectCreatedByCreatorPayload((prev) => ({
        ...prev,
        ProjectsCreatedByCreator: response.data || {},
        isLoading: false,
        error: false,
      }));
    } catch (err) {
      // Catch and handle the error, setting the error message in state
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Error fetching projects:", errorMessage);

      setProjectCreatedByCreatorPayload((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, []);

  // Function to change the project stage type
  const OnChangeProjectStageType = useCallback(
    (projectType: string) => {
      setProjectCreatedByCreatorPayload((prev) => ({
        ...prev,
        currentProjectType: projectType as ProjectStagesType,
      }));
    },
    []
  );

  return (
    <ProjectsCreatedByCreatorContext.Provider
      value={{
        payload: ProjectsCreatedByCreatorPayload,
        OnGettingProjectCreatedByCreator: OnGettingProjectCreatedByCreator,
        OnChangeProjectStageType: OnChangeProjectStageType,
      }}
    >
      {children}
    </ProjectsCreatedByCreatorContext.Provider>
  );
}

// Hook to use the context
export const useProjectsCreatedByCreator = () => {
  const context = useContext(ProjectsCreatedByCreatorContext);
  if (context === undefined) {
    throw new Error("useProjectsCreatedByCreator must be used within a ProjectsCreatedByCreatorProvider");
  }
  return context;
};
