import { DefaultResponse } from "./commonResponse";

export interface FileUploadResponse extends DefaultResponse {
    url?: string;
}
