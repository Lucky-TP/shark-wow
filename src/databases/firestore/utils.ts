import { Transaction } from "firebase-admin/firestore";
import { db } from "src/libs/firebase/firebaseAdmin";
import { CollectionPath } from "src/constants/collection";

export function getDoc(path: string, id: number | string) {
    const doc = db.collection(path).doc(String(id));
    return doc;
}

export async function getDocAndSnapshot(path: string, id: number | string) {
    const doc = getDoc(path, id);
    const snapshot = await doc.get();
    return { doc, snapshot };
}

export function getCollection(path: string) {
    const collection = db.collection(path);
    return collection;
}
