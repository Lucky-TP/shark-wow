import { firestore } from "src/libs/firebase/firebaseAdmin";

export function getDocRef(path: string, id: number | string) {
    return firestore.collection(path).doc(String(id));
}
