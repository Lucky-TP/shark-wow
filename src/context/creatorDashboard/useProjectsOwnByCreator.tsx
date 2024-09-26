import { createContext, useContext } from "react";


import { CreatorOwnProjects } from "src/interfaces/datas/user";


const InitializeProjectsCreatedByCreator : CreatorOwnProjects = {
    drafted: [],
    launched: [],
    failed: [],
    completed: [],
}

const ProjectsCreatedByCreatorContext = createContext<CreatorOwnProjects | undefined>(InitializeProjectsCreatedByCreator)

export function ProjectsCreatedByCreatorProvider ({
    children
} : {
    children : React.ReactNode
}){

    
    return (
        <ProjectsCreatedByCreatorContext.Provider value={InitializeProjectsCreatedByCreator}>
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