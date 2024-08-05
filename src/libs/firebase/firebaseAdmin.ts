import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

// const adminApp = getApps().length
//     ? getApps()[0]
//     : initializeApp({ credential: applicationDefault() });

const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT!, "base64").toString(
        "ascii"
    )
);

const adminApp = getApps().length
    ? getApps()[0]
    : initializeApp({
          credential: cert(serviceAccount),
      });

const auth = getAuth(adminApp);
const db = getFirestore(adminApp);
const storage = getStorage(adminApp);

export { auth, db, storage };
