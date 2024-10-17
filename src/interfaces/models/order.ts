import { OrderStatus, StageId, TransactionType } from "./enums";

export interface OrderModel {
    orderId: string;
    transactionId?: string;
    transactionType: TransactionType;
    uid: string;
    email: string;
    projectId: string;
    projectName: string;
    currency: string;
    stageId: StageId;
    stageName: string;
    amount: number;
    status: OrderStatus;
    paymentIntentId?: string;
    paymentMethod?: string;
    createAt: string;
    updateAt: string;
}
