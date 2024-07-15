import { initializeApp, applicationDefault, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const adminApp = getApps().length
    ? getApps()[0]
    : initializeApp({ credential: applicationDefault() });
const auth = getAuth(adminApp);
const db = getFirestore(adminApp);

export { auth, db };
