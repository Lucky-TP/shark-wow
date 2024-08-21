import axios, { AxiosResponse } from "axios";
import { FileUploadPayloadKeys } from "src/constants/payloadKeys/file";
import { apiPath } from "src/constants/routePath";
import { FileUploadPayload } from "src/interfaces/payload/filePayload";
import { FileUploadResponse } from "src/interfaces/response/fileResponse";

export async function upload(
    payload: FileUploadPayload
): Promise<FileUploadResponse[]> {
    try {
        const formData = new FormData();
        const { file } = payload;

        let files: Blob[] = [];
        if (!Array.isArray(file)) {
            files = [file];
        } else {
            files = [...file];
        }

        const promiseArray = [];
        for (let i = 0; i < files.length; i++) {
            let fields = {
                [FileUploadPayloadKeys.file]: files[i],
                [FileUploadPayloadKeys.fileType]: payload.fileType,
                [FileUploadPayloadKeys.projectId]: payload.projectId,
            };
            Object.entries(fields).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value);
                }
            });

            let promise = axios.post(apiPath.FILES.UPLOAD, formData);
            promiseArray.push(promise);
        }
        const response: AxiosResponse<FileUploadResponse>[] = await Promise.all(
            promiseArray
        );

        return response.map((response) => response.data);
    } catch (error: unknown) {
        throw new Error("Upload failed");
    }
}
