import { StoragePath } from "src/constants/firestore";
import { FileTypeKeys } from "src/constants/payloadKeys/file";

export function getStoragePath(
    fileType: FileTypeKeys,
    uid: string,
    projectId?: string
): string | null {
    switch (fileType) {
        case FileTypeKeys.CAROUSEL_IMAGE_FILES:
            if (!projectId) {
                throw new Error("Project ID is required for carousel images");
            }
            return StoragePath.PROJECT.CAROUSEL_IMAGES(uid, projectId);

        case FileTypeKeys.PROFILE_IMAGE_FILE:
            return StoragePath.USER.PROFILE(uid);

        case FileTypeKeys.CV_FILE:
            return StoragePath.USER.CV(uid);

        default:
            throw new Error("Unsupported file type");
    }
}
