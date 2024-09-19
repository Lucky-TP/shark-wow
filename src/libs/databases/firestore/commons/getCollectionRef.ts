import { firestore } from "src/libs/firebase/firebaseAdmin";

export function getCollectionRef(path: string) {
    return firestore.collection(path);
}
