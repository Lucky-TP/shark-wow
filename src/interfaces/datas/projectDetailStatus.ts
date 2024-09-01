import { ProjectModel } from "../models/project";

export interface ProjectDetialResponse {
    projectData?: ProjectModel ,
    isLoading: boolean,
    error: boolean
}