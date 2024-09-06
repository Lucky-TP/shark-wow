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
