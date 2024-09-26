import { createContext, useContext, useState } from "react";


import { CreatorOwnProjects } from "src/interfaces/datas/user";
import { getCreatorOwnProjects } from "src/services/apiService/users/getCreatorOwnProjects";

enum ProjectStagesType {
    drafted ="drafted",
    launched = "launched",
    failed =  "failed",
    completed = "completed",
    default = "default"
} 


interface ProjectsCreatedByCreatorContextType { 
    payload  : ProjectsCreatedByCreatorType
    OnGettingProjectCreatedByCreator : ()=> Promise<void>
    OnChangeProjectStageType : (projectType : string) => void

}

interface ProjectsCreatedByCreatorType {
    ProjectsCreatedByCreator : CreatorOwnProjects
    isLoading : boolean
    error : boolean,
    currentProjectType : ProjectStagesType
}

const InitializeProjectsCreatedByCreator : ProjectsCreatedByCreatorType = {
    ProjectsCreatedByCreator : {} as CreatorOwnProjects,
    isLoading : false,
    error : false,
    currentProjectType : ProjectStagesType.default
}


const ProjectsCreatedByCreatorContext = createContext<ProjectsCreatedByCreatorContextType | undefined>(undefined)

export function ProjectsCreatedByCreatorProvider ({
    children,
    projectType
} : {
    children : React.ReactNode,
    projectType : string 
}){
    const [ ProjectsCreatedByCreatorPayload , setProjectCreatedByCreatorPayload ] = useState<ProjectsCreatedByCreatorType>(InitializeProjectsCreatedByCreator)
    const [ currentProjectStageType , setCurrentProjectStageType ] = useState<ProjectStagesType>(ProjectStagesType.default)

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

    const OnChangeProjectStageType = (projectType : string) => {
        setCurrentProjectStageType(projectType as ProjectStagesType)
    }

    return (
        <ProjectsCreatedByCreatorContext.Provider value={{payload :  ProjectsCreatedByCreatorPayload, OnGettingProjectCreatedByCreator : OnGettingProjectCreatedByCreator , OnChangeProjectStageType : OnChangeProjectStageType}}>
            {children}
        </ProjectsCreatedByCreatorContext.Provider>
    )
}

export const useProjectsCreatedByCreator = ()=> { 
    const context = useContext(ProjectsCreatedByCreatorContext)
    if (context === undefined){
        throw new Error("useCreatorSummary must be used within a CreatorSummaryProvider")
    }
    return context
}