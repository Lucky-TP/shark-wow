import { StageId, TransactionType } from "./enums";

export interface TransactionLog {
    transactionId: string;
    orderId: string;
    uid: string;
    projectId: string;
    stageId: StageId;
    stageName: string;
    amount: number;
    slipUrl: string;
    transactionType: TransactionType;
    createAt: string;
    updateAt: string;
}
