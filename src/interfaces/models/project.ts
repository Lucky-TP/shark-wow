import { Blog, ReceivedComment } from "./common";
import { ProjectStatus } from "./enums";

interface Stage {
    stageId: number;
    cost: number;
    expire: Date;
}

interface Funding {
    current: number;
    goal: number;
}

interface UpdateLog {
    id: number;
    details: Blog[];
}

interface Product {
    price: number;
    quantity: number;
    description: string;
    arrivalDate: Date;
    websiteUrl: string;
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
    product: Product;
    categories: string[];
    stages: Stage[];
    stories: Blog[];
    updateLogs: UpdateLog[];
    comments: ReceivedComment[];
    payment?: unknown;
}
