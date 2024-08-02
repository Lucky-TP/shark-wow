import { ProjectStatus, StageId, StageStatus } from "../models/enums";

interface Address {
    country?: string;
    city?: string;
    province?: string;
    postalCode?: string;
}

interface Update {
    detail?: string;
    date?: Date;
    belongTo?: StageId;
}

interface Stage {
    status?: StageStatus;
    detail?: string;
    imageUrl?: string;
    goalFunding?: number;
}

export interface EditRunningProjectPayload {
    description?: string;
    status?: ProjectStatus;
    story?: string;
    update?: Update[];
    website?: string;
}

export interface EditDraftProjectPayload {
    name?: string;
    images?: string[];
    description?: string;
    address?: Address;
    status?: ProjectStatus;
    categories?: string;
    stages?: Stage[];
    story?: string;
    update?: Update[];
    website?: string;
    //payment?: unknown;
}