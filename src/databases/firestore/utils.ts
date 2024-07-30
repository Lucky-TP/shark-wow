import { db } from "src/libs/firebase/firebaseAdmin";

export function getDoc(path: string, id: number | string) {
    const doc = db.collection(path).doc(String(id));
    return doc;
}

export function getCollection(path: string) {
    const collection = db.collection(path);
    return collection;
}
