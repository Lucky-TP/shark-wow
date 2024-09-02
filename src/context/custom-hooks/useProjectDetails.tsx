import { 
    useEffect,
    useState,
    useContext, 
    createContext
} from 'react';

import { getProjectById } from 'src/services/apiService/projects/getProjectById';

import { ProjectModel } from 'src/interfaces/models/project';

interface ProjectDetailPayloadInterface {
    data : Partial<ProjectModel>
    isLoading : boolean
    error : boolean
}

const initializedProjectDetailPayload : ProjectDetailPayloadInterface = {
  data : {}, // Initialize with an empty object instead of undefined
  isLoading : true,
  error : false
}

// Define the shape of your project data
const ProjectDetailsContext = createContext<ProjectDetailPayloadInterface>(initializedProjectDetailPayload);

export const ProjectDetailProvider = ({ projectId, children }: { projectId: string, children: React.ReactNode }) => {
    const [projectDetailPayload, SetProjectDetailsPayload] = useState<ProjectDetailPayloadInterface>(initializedProjectDetailPayload)

    const fetchProjectData = async () => {
      if (projectId) {
        try {
          SetProjectDetailsPayload({
            ...projectDetailPayload,
            isLoading : true
          })

          const response = await getProjectById(projectId);
          const data =  response.data;

          await new Promise(resolve => setTimeout(resolve,1000));

          SetProjectDetailsPayload({
            ...projectDetailPayload,
            data: data !== undefined ? data : projectDetailPayload.data,
            isLoading : false
          })

        } catch (error) {
          SetProjectDetailsPayload({
            ...projectDetailPayload,
            error: true
          })
        }
      }
    }

    useEffect(() => {
      if(projectId){
        fetchProjectData();
        console.log(projectId)        
      }
    }, [projectId]);


    return (
      <ProjectDetailsContext.Provider value={projectDetailPayload}>
        {children}
      </ProjectDetailsContext.Provider>
    );
}

export const useProjectDetails = () => {
  const context = useContext(ProjectDetailsContext);
  if (context === null) {
      throw new Error('useProjectDetails must be used within a ProjectDetailProvider');
  }
  return context;
};