import { ProjectModel } from "../models/project";

export interface ProjectDetialResponse {
    projectData?: ProjectModel | undefined | null,
    isLoading: boolean,
    error: boolean
}