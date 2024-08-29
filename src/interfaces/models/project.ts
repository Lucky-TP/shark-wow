import { Address } from "./common";
import { ProjectStatus, StageId, StageStatus } from "./enums";

export interface Update {
    id: number;
    detail: string;
    date: Date;
    belongTo?: StageId;
}

export interface Stage {
    stageId: StageId;
    name: string;
    startDate?: Date;
    expireDate?: Date;
    status: StageStatus;
    detail: string;
    imageUrl: string;
    minimumFunding: number;
    currentFunding: number;
    goalFunding: number;
    totalSupporter: number;
}

export interface ProjectModel {
    projectId: string;
    uid: string;
    name: string;
    carouselImageUrls: string[];
    description: string;
    address: Address;
    totalSupporter: number;
    status: ProjectStatus;
    category: string;
    stages: Stage[];
    story: string;
    discussionIds: string[];
    update: Update[];
    website: string;
    payment?: unknown;
}
