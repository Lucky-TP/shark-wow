import { firestore } from "src/libs/firebase/firebaseAdmin";

export function newDocRef(path: string) {
    return firestore.collection(path).doc();
}
