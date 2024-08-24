import { db } from "src/libs/firebase/firebaseAdmin";

export function getDocRef(path: string, id: number | string) {
    return db.collection(path).doc(String(id));
}
