import { DefaultResponse } from "./commonResponse";

export interface CheckoutResponse extends DefaultResponse {
    redirectUrl: string;
}

export interface PollingResponse extends DefaultResponse {
    slipUrl?: string;
}
