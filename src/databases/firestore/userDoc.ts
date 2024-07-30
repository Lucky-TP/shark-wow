import { getDoc } from "./utils";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/collection";
import { UserModel } from "src/interfaces/models/user";
import { CustomError } from "src/utils/errors/customError";
import { UserToken } from "src/interfaces/token";

const USER_COLLECTION = CollectionPath.USER;

export async function addNewUser(userData: UserModel) {
    try {
        const userDoc = getDoc(USER_COLLECTION, userData.uid);
        const userSnapshot = await userDoc.get();

        if (userSnapshot.exists) {
            throw new CustomError("User exists", StatusCode.ALREADY_EXISTS);
        }

        await userDoc.set(userData);
    } catch (error: any) {
        throw error;
    }
}

export async function getUser(uid: string) {
    try {
        const userDoc = getDoc(USER_COLLECTION, uid);
        const userSnapshot = await userDoc.get();

        if (!userSnapshot.exists) {
            throw new CustomError("User not exists", StatusCode.NOT_FOUND);
        }

        return userSnapshot.data();
    } catch (error: any) {
        throw error;
    }
}
