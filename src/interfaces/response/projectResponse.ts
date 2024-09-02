import { DefaultResponse } from "./commonResponse";
import { ProjectData, ShowProject } from "../datas/project";

export interface GetProjectResponse extends DefaultResponse {
    data?: ProjectData;
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
