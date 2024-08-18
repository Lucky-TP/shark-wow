"use server";
import { bucket } from "src/libs/firebase/firebaseAdmin";
import { StoragePath } from "src/constants/firestore";

export async function uploadFile(file: Blob, pathName: string) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileUpload = bucket.file(pathName);
    await fileUpload.save(buffer, {
        metadata: {
            contentType: file.type,
        },
        public: true,
    });
    const downloadUrl = `${StoragePath.BASE_URL}/${pathName}`;
    return downloadUrl;
}
