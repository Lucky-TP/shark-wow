import { Blog, ProjectStatus, ReceivedComment } from "./common";

interface Stage {
    stageId: number;
    cost: number;
    expire: Date;
}

interface Funding {
    current: number;
    goal: number;
}

export interface ProjectModel {
    projectId: number;
    uid: string;
    name: string;
    images: string[];
    description: string;
    favoriteCount: number;
    status: ProjectStatus;
    funding: Funding;
    categories: string[];
    stages: Stage[];
    stories: Blog[];
    updateLogs: Blog[];
    comments: ReceivedComment[];
    payment?: unknown;
}
