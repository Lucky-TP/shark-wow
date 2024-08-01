import { DefaultResponse } from "./commonResponse";
import { PopularCreator, UserDataWithDate } from "../models/common";

export interface GetUserResponse extends DefaultResponse {
    data?: UserDataWithDate;
}

export interface EditUserResponse extends DefaultResponse {}

export interface GetTopTenCreatorResponse extends DefaultResponse {
    data: PopularCreator[];
}
