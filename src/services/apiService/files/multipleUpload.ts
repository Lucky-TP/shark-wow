import axios, { AxiosResponse } from "axios";
import {
    FileUploadPayloadKeys,
    ProjectFileType,
    UserFileType,
} from "src/constants/payloadKeys/file";
import { apiPath } from "src/constants/routePath";
import { FileUploadResponse } from "src/interfaces/response/fileResponse";
import { isProjectFileType } from "src/utils/files/common/typeGuard";

export interface UserFileUploadsDetail {
    files: File[];
    type: UserFileType;
}

export interface ProjectFileUploadsDetail {
    files: File[];
    type: ProjectFileType;
    projectId: string;
}

export async function multipleUpload(
    fileUploadDetail: UserFileUploadsDetail
): Promise<FileUploadResponse[]>;

export async function multipleUpload(
    fileUploadDetail: ProjectFileUploadsDetail
): Promise<FileUploadResponse[]>;

export async function multipleUpload(
    fileUploadDetail: UserFileUploadsDetail | ProjectFileUploadsDetail
): Promise<FileUploadResponse[]> {
    const { files, type } = fileUploadDetail;
    const projectId = isProjectFileType(type)
        ? (fileUploadDetail as ProjectFileUploadsDetail).projectId
        : undefined;

    try {
        if (isProjectFileType(type) && !projectId) {
            throw new Error("Project file must be along with projectId");
        }

        const createFormData = (file: File): FormData => {
            const formData = new FormData();
            const fields = {
                [FileUploadPayloadKeys.file]: file,
                [FileUploadPayloadKeys.type]: type,
                ...(projectId && { [FileUploadPayloadKeys.projectId]: projectId }),
            };
            Object.entries(fields).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });
            return formData;
        };
        const uploadPromises = files.map((file) => {
            const formData = createFormData(file);
            return axios.post(apiPath.FILES.UPLOAD, formData);
        });
        const response: AxiosResponse<FileUploadResponse>[] = await Promise.all(uploadPromises);

        return response.map((response) => response.data);
    } catch (error: unknown) {
        throw new Error("Upload failed");
    }
}
