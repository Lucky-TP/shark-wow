import fs from "fs";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as admin from "firebase-admin";

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
console.log(serviceAccountPath);

if (!serviceAccountPath) {
    console.error("GOOGLE_APPLICATION_CREDENTIALS is not set");
    process.exit(1);
}

const serviceAccountContent = fs.readFileSync(serviceAccountPath, "utf8");
const serviceAccount = JSON.parse(serviceAccountContent);

if (!getApps().length) {
    initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = getFirestore();
export { db };
