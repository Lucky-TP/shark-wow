import { DefaultResponse } from "./commonResponse";
import { PopularCreator, UserData } from "../models/common";

export interface GetUserResponse extends DefaultResponse {
    data?: UserData;
}

export interface EditUserResponse extends DefaultResponse {}

export interface GetTopTenCreatorResponse extends DefaultResponse {
    data: PopularCreator[];
}
