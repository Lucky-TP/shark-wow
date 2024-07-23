import { UserModel } from "../models/user";
import { DefaultResponse } from "./commonResponse";

export interface GetUserResponse extends DefaultResponse {
    data?: UserModel;
}
