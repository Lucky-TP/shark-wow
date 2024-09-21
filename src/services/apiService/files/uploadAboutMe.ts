import axios, { AxiosResponse } from "axios";
import { FileUploadPayloadKeysAboutMe } from "src/constants/payloadKeys/file";
import { apiPath } from "src/constants/routePath";
import { FileUploadPayload } from "src/interfaces/payload/filePayloadAboutMe";
import { FileUploadResponse } from "src/interfaces/response/fileResponse";

export async function uploadAboutMe(payload: FileUploadPayload): Promise<FileUploadResponse[]> {
    try {
        const file = payload.file;

        let files: Blob[] = [];
        if (!Array.isArray(file)) {
            files = [file];
        } else {
            files = [...file];
        }
        console.log(files);
        const promiseArray: Promise<AxiosResponse<any, any>>[] = [];
        files.forEach((file) => {
            const formData = new FormData();
            const fields = {
                [FileUploadPayloadKeysAboutMe.file]: file,
                [FileUploadPayloadKeysAboutMe.fileType]: payload.fileType,
            };
            console.table(fields);
            Object.entries(fields).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value);
                }
            });
            console.table(formData);

            const promise = axios.post(apiPath.FILES.UPLOAD, formData);
            promiseArray.push(promise);
        });
        const response: AxiosResponse<FileUploadResponse>[] = await Promise.all(promiseArray);

        return response.map((response) => response.data);
    } catch (error: unknown) {
        throw new Error("Upload failed");
    }
}
