import { getCollectionRef } from "../commons";
import { TransactionLog } from "src/interfaces/models/transaction";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { CustomError } from "src/libs/errors/apiError";

export async function getTransactionLogsByUserId(userId: string): Promise<TransactionLog[]>;

export async function getTransactionLogsByUserId<T>(
    userId: string,
    callback: (TransactionLog: TransactionLog) => T
): Promise<T[]>;

export async function getTransactionLogsByUserId<T>(
    userId: string,
    callback?: (TransactionLog: TransactionLog) => T
): Promise<T[]> {
    try {
        const retrievedTransactionLogs: T[] = [];
        const transactionLogCollection = getCollectionRef(CollectionPath.TRANSACTION);
        const querySnapshot = await transactionLogCollection.where("uid", "==", userId).get();
        const retrievedTransactionLogChunk = querySnapshot.docs.map((transactionLogSnapshot) => {
            const transactionLog = transactionLogSnapshot.data() as TransactionLog;
            if (callback) {
                return callback(transactionLog);
            }
            return transactionLog as T;
        });
        retrievedTransactionLogs.push(...retrievedTransactionLogChunk);
        return retrievedTransactionLogs;
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError("Retrive transaction logs failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
