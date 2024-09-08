import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { GetOrderResponse } from "src/interfaces/response/orderResponse";

export async function getOrder(orderId: string) {
    try {
        const result: AxiosResponse<GetOrderResponse> = await axios.get(
            `${apiPath.ORDERS.GET(orderId)}`
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get order failed");
    }
}
