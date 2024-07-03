import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as admin from "firebase-admin";
import path from "path";
import fs from "fs";

// Resolve the path to the service account key file in the root directory
const serviceAccountPath = path.resolve(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS!);

if (!fs.existsSync(serviceAccountPath)) {
    console.error(
        "Service account key file does not exist:",
        serviceAccountPath
    );
    process.exit(1);
}

// Read the service account key file
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
console.log("Loaded service account:", serviceAccount);

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
    initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = getFirestore();
export { db };
