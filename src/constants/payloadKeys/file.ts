export enum FileTypeKeys {
    CAROUSEL_IMAGE_FILES = "carouselImageFiles",
    PROFILE_IMAGE_FILE = "profileImageFile",
    CV_FILE = "cvFile",
}

export const FileUploadPayloadKeys = {
    file: "file",
    fileType: "fileType",
    projectId: "projectId",
} as const;

export const FileUploadPayloadKeysAboutMe = {
    file: "file",
    fileType: "fileType",
} as const;