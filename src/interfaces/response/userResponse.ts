import { UserModel } from "../models/user";
import { DefaultResponse } from "./commonResponse";
import { PopularCreator } from "../models/common";

export interface GetUserResponse extends DefaultResponse {
    data?: UserModel;
}

export interface EditUserResponse extends DefaultResponse {
    
}

export interface GetTopTenCreatorResponse extends DefaultResponse {
    data: PopularCreator[];
}
