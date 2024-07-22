export interface DefaultResponse {
    message: string;
    status: number;
}

export interface FileUploadResponse extends DefaultResponse {
    url?: string;
}
