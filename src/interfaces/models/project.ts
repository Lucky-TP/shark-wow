import { ReceivedComment } from "./common";
import { ProjectStatus, StageId, StageStatus } from "./enums";

export interface Address {
    country: string;
    city: string;
    province: string;
    postalCode: string;
}

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
    currentFunding: number;
    goalFunding: number;
    totalSupporter: number;
}

export interface ProjectModel {
    projectId: number;
    uid: string;
    name: string;
    images: string[];
    description: string;
    address: Address;
    totalSupporter: number;
    status: ProjectStatus;
    categories: string[];
    stages: Stage[];
    story: string;
    discussion: ReceivedComment[];
    update: Update[];
    website: string;
    payment?: unknown;
}
