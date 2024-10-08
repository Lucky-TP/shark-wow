import { ProjectModel, Stage } from "../models/project";
import { CommentData } from "./comment";
import { ProjectStatus } from "../models/enums";

export type ProjectData = Omit<ProjectModel, "discussionIds"> & {
    discussion: CommentData[];
    currentStage?: Stage;
    startDate: string;
    expireDate: string;
};

export interface ShowProject {
    projectId: string;
    name: string;
    carouselImageUrls: string[];
    description: string;
    stages: Stage[];
    category: string;
    status: ProjectStatus;
}

export interface ProjectPreview {
    projectId: string;
    name: string;
    previewImageUrl: string;
    totalSupports: number;
}

export interface ProjectSummary extends ProjectPreview {
    currentStage: Stage;
    projectStatus: ProjectStatus;
    isFundingComplete: boolean;
    isUpdateOnce: boolean;
}

export interface ExtendProjectPreview extends ProjectPreview {
    currentStage: Stage;
    projectOwnerUsername: string;
    stages: Stage[];
}
