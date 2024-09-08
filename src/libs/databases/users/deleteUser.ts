import { CollectionPath } from "src/constants/firestore";
import { getDocRef, runTransaction } from "../firestore";
import { CustomError } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";

export async function deleteUser(uid: string) {
    try {
        await runTransaction(async (transaction) => {
            const userDocRef = getDocRef(CollectionPath.USER, uid);
            transaction.delete(userDocRef);
        });
    } catch (error: unknown) {
        throw new CustomError("Delete user failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
