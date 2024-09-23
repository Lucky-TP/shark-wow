export type ProjectFileType = "carousel" | "projectGeneral";
export type UserFileType = "profile" | "userGeneral" | "cv";

export const FileUploadPayloadKeys = {
    file: "file",
    type: "type",
    projectId: "projectId",
} as const;

export const FileUploadPayloadKeysAboutMe = {
    file: "file",
    fileType: "fileType",
} as const;
