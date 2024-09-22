export type ProjectFileType = "carousel" | "general";
export type UserFileType = "profile" | "general" | "cv";

export const FileUploadPayloadKeys = {
    file: "file",
    type: "type",
    projectId: "projectId",
} as const;
