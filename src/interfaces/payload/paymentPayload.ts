import { StripePaymentMethod } from "src/constants/paymentMethod";
import { StageId, TransactionType } from "../models/enums";

export interface CheckoutPayload {
    projectId: string;
    projectName: string;
    stageId: StageId;
    stageName: string;
    fundingCost: number;
    paymentMethod: StripePaymentMethod;
    transactionType: TransactionType;
}
