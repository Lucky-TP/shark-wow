import { OrderModel } from "../models/order";
import { DefaultResponse } from "./commonResponse";

export interface GetOrderResponse extends DefaultResponse {
    data?: OrderModel;
}
