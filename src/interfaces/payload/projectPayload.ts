import { Address } from "../models/common";
import { ProjectStatus } from "../models/enums";
import { Stage, Update } from "../models/project";

export interface EditProjectPayload {
    name: string;
    carouselImageUrls: string[];
    description: string;
    address: Partial<Address>;
    status: ProjectStatus;
    categories: string;
    stages: Partial<Stage>[];
    story: string;
    update: Partial<Update>[];
    website: string;
    //payment?: unknown;
}
