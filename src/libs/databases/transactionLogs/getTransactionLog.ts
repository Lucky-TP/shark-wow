import { getDocRef, runTransaction } from "../firestore";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { TransactionLog } from "src/interfaces/models/transaction";
import { CustomError } from "src/libs/errors/apiError";

export async function getTransactionLog(transactionLogId: string) {
    try {
        const transactionLogDocRef = getDocRef(CollectionPath.TRANSACTION, transactionLogId);
        const transactionLogSnapshot = await transactionLogDocRef.get();

        if (!transactionLogSnapshot.exists) {
            throw new CustomError("transactionLog not exists", StatusCode.NOT_FOUND);
        }

        return transactionLogSnapshot.data() as TransactionLog;
    } catch (error: unknown) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError("Get transactionLog failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
