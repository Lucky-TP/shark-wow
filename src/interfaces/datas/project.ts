import { ProjectModel } from "../models/project";
import { CommentData } from "./comment";

export type ProjectData = Omit<ProjectModel, "discussionIds"> & {
    discussion: CommentData[];
};

interface Stage {
    fundingCost: number;
    currentFunding: number;
    goalFunding: number;
}

export interface ShowProject {
    projectId: string;
    name: string;
    carouselImageUrls: string[];
    description: string;
    stages: Stage[];
    category: string;
}
