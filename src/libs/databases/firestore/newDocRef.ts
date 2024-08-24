import { db } from "src/libs/firebase/firebaseAdmin";

export function newDocRef(path: string) {
    return db.collection(path).doc();
}
