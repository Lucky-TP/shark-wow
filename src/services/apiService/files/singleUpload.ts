import { ProjectFileType, UserFileType } from "src/constants/payloadKeys/file";
import { FileUploadResponse } from "src/interfaces/response/fileResponse";
import { isProjectFileType } from "src/utils/files/common/typeGuard";
import { multipleUpload, ProjectFileUploadsDetail, UserFileUploadsDetail } from "./multipleUpload";

export interface UserFileUploadDetail {
    file: File;
    type: UserFileType;
}

export interface ProjectFileUploadDetail {
    file: File;
    type: ProjectFileType;
    projectId: string;
}

// Overload signatures
export async function singleUpload(
    fileUploadDetail: UserFileUploadDetail
): Promise<FileUploadResponse>;

export async function singleUpload(
    fileUploadDetail: ProjectFileUploadDetail
): Promise<FileUploadResponse>;

// General implementation
export async function singleUpload(
    fileUploadDetail: UserFileUploadDetail | ProjectFileUploadDetail
): Promise<FileUploadResponse> {
    try {
        // Type narrowing based on whether the file type is a project file or not
        if (isProjectFileType(fileUploadDetail.type)) {
            // Handle ProjectFileUploadDetail
            const projectFileUploadDetail: ProjectFileUploadsDetail = {
                files: [fileUploadDetail.file], // Wrapping single file in array
                type: fileUploadDetail.type,
                projectId: (fileUploadDetail as ProjectFileUploadDetail).projectId, // Safe cast
            };
            const responses = await multipleUpload(projectFileUploadDetail);
            return responses[0]; // Return the first response for single file upload
        } else {
            // Handle UserFileUploadDetail
            const userFileUploadDetail: UserFileUploadsDetail = {
                files: [fileUploadDetail.file], // Wrapping single file in array
                type: fileUploadDetail.type,
            };
            const responses = await multipleUpload(userFileUploadDetail);
            return responses[0]; // Return the first response for single file upload
        }
    } catch (error: unknown) {
        console.error("File upload error:", error);
        throw new Error(
            `Single upload failed: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
}
