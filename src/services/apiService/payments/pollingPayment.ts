import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { PollingResponse } from "src/interfaces/response/paymentResponse";

export async function pollingPayment(orderId: string) {
    try {
        const result: AxiosResponse<PollingResponse> = await axios.get(
            `${apiPath.PAYMENTS.POLLING.GET(orderId)}`
        );
        result.data.status = result.status;
        return result.data;
    } catch (error: unknown) {
        throw new Error("Get order failed");
    }
}
