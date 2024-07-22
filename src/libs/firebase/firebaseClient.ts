import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

const clientApp = getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig, "clientApp");

const auth = getAuth(clientApp);
const storage = getStorage(clientApp);

export { auth, storage };
