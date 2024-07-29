import { TransactionType } from "./enums";

export interface TransactionLog {
    transactionId: number;
    uid: number;
    projectId: number;
    stageId: number;
    date: Date;
    amount: number;
    slipUrl: string;
    type: TransactionType;
}
