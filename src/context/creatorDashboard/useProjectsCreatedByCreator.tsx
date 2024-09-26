import { createContext, useContext, useState } from "react";


import { CreatorOwnProjects } from "src/interfaces/datas/user";
import { getCreatorOwnProjects } from "src/services/apiService/users/getCreatorOwnProjects";


interface ProjectsCreatedByCreatorContextType { 
    payload  : ProjectsCreatedByCreatorType
    OnGettingProjectCreatedByCreator : ()=> Promise<void>
}

interface ProjectsCreatedByCreatorType {
    ProjectsCreatedByCreator : CreatorOwnProjects
    isLoading : boolean
    error : boolean
}

const InitializeProjectsCreatedByCreator : ProjectsCreatedByCreatorType = {
    ProjectsCreatedByCreator : {} as CreatorOwnProjects,
    isLoading : false,
    error : false
}


const ProjectsCreatedByCreatorContext = createContext<ProjectsCreatedByCreatorContextType | undefined>(undefined)

export function ProjectsCreatedByCreatorProvider ({
    children
} : {
    children : React.ReactNode
}){
    const [ ProjectsCreatedByCreatorPayload , setProjectCreatedByCreatorPayload ] = useState<ProjectsCreatedByCreatorType>(InitializeProjectsCreatedByCreator)

    const OnGettingProjectCreatedByCreator = async () => { 
        // API CAll
        setProjectCreatedByCreatorPayload({
            ...ProjectsCreatedByCreatorPayload,
            isLoading : true ,
            error : false
        })
        try { 
            const response = await getCreatorOwnProjects()
            if (response.data) { 
                setProjectCreatedByCreatorPayload({
                    ...ProjectsCreatedByCreatorPayload,
                    ProjectsCreatedByCreator : response.data,
                    error : false
                })
            }
        }catch(err) { 
            setProjectCreatedByCreatorPayload({
                ...ProjectsCreatedByCreatorPayload,
                error : true 
            }) 
        }        
        setProjectCreatedByCreatorPayload({
            ...ProjectsCreatedByCreatorPayload,
            isLoading : false
            }) 
    }
    
    return (
        <ProjectsCreatedByCreatorContext.Provider value={{payload :  ProjectsCreatedByCreatorPayload, OnGettingProjectCreatedByCreator : OnGettingProjectCreatedByCreator}}>
            {children}
        </ProjectsCreatedByCreatorContext.Provider>
    )
}

export const useProjectsCreatedByCreator = ()=> { 
    const context = useContext(ProjectsCreatedByCreatorContext)
    if (context){
        return context
    }
}