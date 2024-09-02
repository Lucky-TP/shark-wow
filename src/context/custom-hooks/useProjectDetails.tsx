import { 
    useEffect,
    useState,
    useContext, 
    createContext
} from 'react';

import { getProjectById } from 'src/services/apiService/projects/getProjectById';
import { getUserById } from 'src/services/apiService/users/getUserById';

import { ProjectModel } from 'src/interfaces/models/project';
import { UserModel } from 'src/interfaces/models/user';

import { message } from 'antd';


interface ProjectDetailPayloadInterface {
    ProjectInfo : Partial<ProjectModel>
    UserInfo : Partial<UserModel>
    isLoading : boolean
    error : boolean
    OnGettingUserDetails?: (uid : string) => Promise<void>
}

const initializedProjectDetailPayload : ProjectDetailPayloadInterface = {
  ProjectInfo : {}, // Initialize with an empty object instead of undefined
  UserInfo : {},
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
            ProjectInfo: data !== undefined ? data : projectDetailPayload.ProjectInfo,
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

    const OnGettingUserDetails = async (uid : string )=>{
      try{
        const response = await getUserById(uid)
        const data = response.data
        console.log(data)
        if(data) { 
          SetProjectDetailsPayload({
            ...projectDetailPayload,
            UserInfo: {
              uid: data.uid,
              username: data.username ,
              profileImageUrl : data.profileImageUrl,
              birthDate: data.birdthDate
            }
          })    
              
        }
      }catch(error){
        message.error("User data not found!");
      }
    }

    useEffect(() => {
      if(projectId){
        fetchProjectData();
        console.log(projectId)        
      }
    }, [projectId]);

  


    return (
      <ProjectDetailsContext.Provider value={{...projectDetailPayload,OnGettingUserDetails}}>
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