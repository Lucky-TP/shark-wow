import { StatusCode } from "src/constants/statusCode";
import { db } from "src/libs/firebase/firebaseAdmin";
import { UserData } from "src/types/schema/user";
import { CustomError } from "src/utils/errors/customError";

const USER_COLLECTION_PATH = "/users";

export function getDoc(userId: string) {
    const userDoc = db.collection(USER_COLLECTION_PATH).doc(userId);
    console.log(userDoc);
    return userDoc;
}

export function getCollection() {
    const usersCollection = db.collection(USER_COLLECTION_PATH);
    return usersCollection;
}

export async function addNewUser(userId: string, userData: UserData) {
    try {
        const userDoc = getDoc(userId);
        const userSnapshot = await userDoc.get();

        if (userSnapshot.exists) {
            throw new CustomError("User exists", StatusCode.ALREADY_EXISTS);
        }

        await userDoc.set(userData);
    } catch (error: any) {
        throw new CustomError(
            "Error adding new user:",
            StatusCode.INTERNAL_SERVER_ERROR
        );
    }
}
