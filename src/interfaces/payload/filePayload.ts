import { ProjectFileType, UserFileType } from "src/constants/payloadKeys/file";

export interface FileUploadPayload {
    file: File | File[];
    type: UserFileType | ProjectFileType;
    projectId?: string;
}
