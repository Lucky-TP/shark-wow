import { getCollectionRef, runTransaction } from "../firestore";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { UserModel } from "src/interfaces/models/user";
import { CustomError } from "src/libs/errors/apiError";

export async function addNewUser(userData: UserModel) {
    try {
        const { uid, email } = userData;
        await runTransaction(async (transaction) => {
            const userCollection = getCollectionRef(CollectionPath.USER);

            const userDocRef = userCollection.doc(uid);
            const userSnapshot = await transaction.get(userDocRef);
            if (userSnapshot.exists) {
                throw new CustomError(
                    "User aleready exists",
                    StatusCode.ALREADY_EXISTS
                );
            }

            const querySnapshot = await transaction.get(
                userCollection.where("email", "==", email)
            );
            if (!querySnapshot.empty) {
                throw new CustomError(
                    "Email aleready used",
                    StatusCode.ALREADY_EXISTS
                );
            }

            transaction.set(userDocRef, userData);
        });
    } catch (error: unknown) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError(
            "Add new user failed",
            StatusCode.INTERNAL_SERVER_ERROR
        );
    }
}
