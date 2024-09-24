import { DefaultResponse } from "./commonResponse";
import {
    CreatorOwnProjects,
    CreatorSummaryStats,
    PopularCreator,
    PublicUserData,
} from "../datas/user";
import { UserData } from "../datas/user";

export interface GetUserResponse extends DefaultResponse {
    data: UserData;
}

export interface EditUserResponse extends DefaultResponse {}

export interface GetTopTenCreatorResponse extends DefaultResponse {
    data: PopularCreator[];
}
export interface GetUserByIdResponse extends DefaultResponse {
    data?: PublicUserData;
}

export interface GetCreatorSummaryStats extends DefaultResponse {
    data: CreatorSummaryStats;
}

export interface GetCreatorOwnProjects extends DefaultResponse {
    data: CreatorOwnProjects;
}
