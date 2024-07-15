import { db } from "src/libs/firebase/firebaseAdmin";
import { UserData } from "src/types/schema/user";

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
            throw new Error("User exists");
        }

        await userDoc.set(userData);
        console.log("New user added successfully");
    } catch (error: any) {
        throw new Error("Error adding new user:", error);
    }
}
