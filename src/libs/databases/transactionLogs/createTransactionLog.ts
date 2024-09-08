import { newDocRef, runTransaction } from "../firestore";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { TransactionLog } from "src/interfaces/models/transaction";
import { CustomError } from "src/libs/errors/apiError";
import { dateToString } from "src/utils/date";

type InitialTransactionLog = Omit<TransactionLog, "transactionId" | "createAt" | "updateAt">;

export async function createTransactionLog(transactionLogData: InitialTransactionLog) {
    try {
        const transactionLogId = await runTransaction(async (transaction) => {
            const docRef = newDocRef(CollectionPath.TRANSACTION);
            const transactionLog: TransactionLog = {
                transactionId: docRef.id,
                orderId: transactionLogData.orderId,
                uid: transactionLogData.uid,
                projectId: transactionLogData.projectId,
                stageId: transactionLogData.stageId,
                stageName: transactionLogData.stageName,
                amount: transactionLogData.amount,
                slipUrl: transactionLogData.slipUrl,
                transactionType: transactionLogData.transactionType,
                createAt: dateToString(new Date()),
                updateAt: dateToString(new Date()),
            };
            transaction.set(docRef, transactionLog);
            return docRef.id;
        });
        return transactionLogId;
    } catch (error: unknown) {
        console.log(error);
        throw new CustomError("Create transactionLog failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
