import { getDocRef } from "../firestore";
import { UserModel } from "src/interfaces/models/user";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";

export async function getUser(uid: string) {
    try {
        const userDocRef = getDocRef(CollectionPath.USER, uid);
        const userSnapshot = await userDocRef.get();

        if (!userSnapshot.exists) {
            throw new CustomError("User not exists", StatusCode.NOT_FOUND);
        }

        return userSnapshot.data() as UserModel;
    } catch (error: unknown) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError("Get user failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
