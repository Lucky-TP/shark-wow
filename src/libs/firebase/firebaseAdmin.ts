import { initializeApp, applicationDefault, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const adminApp = getApps().length
    ? getApps()[0]
    : initializeApp({ credential: applicationDefault() });
const auth = getAuth(adminApp);

export { auth };
