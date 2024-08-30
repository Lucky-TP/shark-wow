import { DefaultResponse } from "./commonResponse";
import { ShowProject } from "../models/common";
import { ProjectModel } from "../models/project";

export interface GetProjectResponse extends DefaultResponse {
    data?: ProjectModel;
}

export interface CreateProjectResponse extends DefaultResponse {
    data?: { projectId: string };
}

export interface GetProjectsByCategoriesResponse extends DefaultResponse {
    data: ShowProject[];
}

export interface GetPopularProjectsResponse extends DefaultResponse {
    data: ShowProject[];
}
