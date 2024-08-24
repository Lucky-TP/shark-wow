"use server";
import { bucket } from "src/libs/firebase/firebaseAdmin";
import { getDownloadURL } from "firebase-admin/storage";

export async function uploadFile(
    file: Blob,
    pathName: string
): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileUpload = bucket.file(pathName);
    await fileUpload.save(buffer, {
        metadata: { contentType: file.type },
    });
    await fileUpload.makePublic();

    const downloadURL = await getDownloadURL(fileUpload);
    return downloadURL;
}
