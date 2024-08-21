import { FileTypeKeys } from "src/constants/payloadKeys/file";

export interface FileUploadPayload {
    file: Blob | Blob[];
    fileType: FileTypeKeys;
    projectId?: string;
}
