import { ReceivedComment, TransactionType } from "./common";

interface TransactionLog {
    projectId: number;
    stageId: number;
    cost: number;
    slipUrl: string;
    type: TransactionType;
}

export interface UserModel {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profileImageUrl?: string;
    myProjectIds: number[];
    favoriteProjectIds: number[];
    receivedComments: ReceivedComment[];
    transactionLogs: TransactionLog[];
    agreement: boolean;
    signInType?: unknown;
}
