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


// Define the shape of your project data
const ProjectDetailsContext = createContext<string | null>(null);

export const ProjectDetailProvider = ({ projectId, children }: { projectId: string, children: React.ReactNode }) => {
    const [projectDetailPayload, SetProjectDetailsPayload] = useState<ProjectDetailPayloadInterface>({
      data : {
        projectId: '',
        uid: '',
        name: '',
        carouselImageUrls: [],
        description: '',
        address: {
          country: '',
          province: '',
          city: '',
          postalCode: '',
        },
        totalSupporter: 0,
        status: 0, // Assuming status is a number or enum type starting from 0
        totalQuantity: 0,
        costPerQuantity: 0,
        category: '',
        stages: [],
        story: '',
        discussionIds: [],
        update: [],
        website: '',
        payment: undefined, // Optional, use undefined if it's not initialized      
      },
      isLoading : true,
      error : false
    })
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
            data: data || {},
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
        fetchProjectData();
    }, []);

    return (
      <ProjectDetailsContext.Provider value={projectId}>
        {children}
      </ProjectDetailsContext.Provider>
    );
}


