import { ProjectModel, Stage } from "../models/project";
import { CommentData } from "./comment";
import { ProjectStatus } from "../models/enums";

export type ProjectData = ProjectModel & {
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

export interface ProjectLaunchedSummary extends ProjectPreview {
    currentStage: Stage;
    projectStatus: ProjectStatus;
    isFundingComplete: boolean;
    isUpdateOnce: boolean;
}

export interface ProjectCompletedSummary extends ProjectPreview {
    totalFunding: number;
    projectStatus: ProjectStatus;
}

export interface ProjectFailedSummary extends ProjectPreview {
    failedStage: Stage;
    projectStatus: ProjectStatus;
}

export interface ExtendProjectPreview extends ProjectPreview {
    currentStage: Stage;
    projectOwnerUsername: string;
    stages: Stage[];
    totalQuantity: number;
    costPerQuantity: number;
}

export { ProjectStatus };
