import { db } from "src/libs/firebase/firebaseAdmin";

export function getCollectionRef(path: string) {
    return db.collection(path);
}
