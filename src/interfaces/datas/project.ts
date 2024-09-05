import { Timestamp } from "firebase/firestore";
import { ProjectModel, Stage } from "../models/project";
import { CommentData } from "./comment";
import { ProjectStatus } from "../models/enums";

export type ProjectData = Omit<ProjectModel, "discussionIds"> & {
    discussion: CommentData[];
    currentStage?: Stage;
    startDate?: Timestamp;
    expireDate?: Timestamp;
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
