import { Address } from "../models/common";
import { ProjectStatus } from "../models/enums";
import { Stage, Update } from "../models/project";

export interface EditProjectPayload {
    name: string;
    carouselImageUrls: string[];
    description: string;
    address: Address;
    status: ProjectStatus;
    category: string;
    stages: Stage[];
    story: string;
    update: Update[];
    website: string;
    //payment?: unknown;
}
