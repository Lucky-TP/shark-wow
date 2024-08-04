import { db } from "src/libs/firebase/firebaseAdmin";

export async function runTransaction(
    transactionFunction: (
        transaction: FirebaseFirestore.Transaction
    ) => Promise<void>
) {
    await db.runTransaction(transactionFunction);
}
