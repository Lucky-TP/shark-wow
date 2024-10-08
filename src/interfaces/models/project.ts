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
    startDate: string;
    expireDate: string;
    status: StageStatus;
    detail: string;
    imageUrl: string;
    fundingCost: number;
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
    totalQuantity: number;
    costPerQuantity: number;
    category: string;
    stages: Stage[];
    story: string;
    discussionIds: string[];
    update: Update[];
    website: string;
    payment?: unknown;
}
