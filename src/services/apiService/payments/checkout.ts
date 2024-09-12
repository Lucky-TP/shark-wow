import axios, { AxiosResponse } from "axios";
import { apiPath } from "src/constants/routePath";
import { CheckoutPayload } from "src/interfaces/payload/paymentPayload";
import { CheckoutResponse } from "src/interfaces/response/paymentResponse";

export async function checkout(payload: CheckoutPayload) {
    try {
        const result: AxiosResponse<CheckoutResponse> = await axios.post(
            apiPath.PAYMENTS.CHECKOUT.CREATE,
            payload
        );
        result.data.status = result.status;
        console.log(result.data);
        return result.data;
    } catch (error: unknown) {
        throw new Error("Checkout failed");
    }
}
