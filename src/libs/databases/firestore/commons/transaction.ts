import { firestore } from "src/libs/firebase/firebaseAdmin";

export async function runTransaction<T>(
    transactionFunction: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> {
    return firestore.runTransaction(transactionFunction);
}
