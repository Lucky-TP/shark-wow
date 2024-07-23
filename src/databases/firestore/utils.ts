import { db } from "src/libs/firebase/firebaseAdmin";

export function getDoc(path: string, userId: string) {
    const userDoc = db.collection(path).doc(userId);
    return userDoc;
}

export function getCollection(path: string) {
    const usersCollection = db.collection(path);
    return usersCollection;
}
