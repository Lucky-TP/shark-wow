import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase } from "firebase/database";

const clientApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig, "clientApp");

const auth = getAuth(clientApp);
const storage = getStorage(clientApp);
const realtimeDbClient = getDatabase(clientApp);

export { auth, storage, realtimeDbClient };
