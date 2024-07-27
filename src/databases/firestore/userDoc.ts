import { getDoc } from "./utils";
import { StatusCode } from "src/constants/statusCode";
import { UserModel } from "src/interfaces/models/user";
import { CustomError } from "src/utils/errors/customError";

const USER_COLLECTION_PATH = "/users";

export async function addNewUser(userData: UserModel) {
    try {
        const userDoc = getDoc(USER_COLLECTION_PATH, userData.uid);
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
        const userDoc = getDoc(USER_COLLECTION_PATH, uid);
        const userSnapshot = await userDoc.get();

        if (!userSnapshot.exists) {
            throw new CustomError("User not exists", StatusCode.NOT_FOUND);
        }
        
        return userSnapshot.data();
    } catch (error: any) {
        throw error;
    }
}
