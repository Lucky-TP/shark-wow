import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "src/libs/firebase/firebaseClient";

export async function uploadFile(file: Blob, url: string) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const storageRef = ref(storage, url);
    const snapshot = await uploadBytes(storageRef, buffer);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
}
