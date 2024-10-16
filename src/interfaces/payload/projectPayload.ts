import { Address } from "../models/common";
import { ProjectStatus, StageId } from "../models/enums";
import { Stage, Update } from "../models/project";

export interface EditProjectPayload {
    name: string;
    carouselImageUrls: string[];
    description: string;
    address: Address;
    status: ProjectStatus;
    totalQuantity: number;
    costPerQuantity: number;
    category: string;
    stages: Stage[];
    story: string;
    update: Update[];
    website: string;
    accountBank: string;
    accountHolderName: string;
    accountNumber: string;
}

export interface AddNewUpdateToProjectPayload {
    title: string;
    detail: string;
    belongTo?: StageId;
}
