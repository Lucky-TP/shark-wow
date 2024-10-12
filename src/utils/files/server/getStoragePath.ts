import { StoragePath } from "src/constants/firestore";
import { isProjectFileType, isUserFileType } from "../common/typeGuard";
import { CustomError } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";

export function getStoragePath(type: string, uid: string): string;
export function getStoragePath(type: string, uid: string, projectId: string): string;

export function getStoragePath(type: string, uid: string, projectId?: string): string {
    if (isUserFileType(type)) {
        switch (type) {
            case "profile":
                return StoragePath.USER.PROFILE(uid);
            case "cv":
                return StoragePath.USER.CV(uid);
            case "userGeneral":
                return StoragePath.USER.GENERAL(uid);
            default:
                throw new CustomError(
                    `Unsupported user file type: ${type}`,
                    StatusCode.BAD_REQUEST
                );
        }
    }

    if (isProjectFileType(type)) {
        if (!projectId) {
            throw new Error("Project ID is required for project file types");
        }
        switch (type) {
            case "carousel":
                return StoragePath.PROJECT.CAROUSEL_IMAGES(uid, projectId);
            case "projectGeneral":
                return StoragePath.PROJECT.GENERAL(uid, projectId);
            default:
                throw new CustomError(
                    `Unsupported project file type: ${type}`,
                    StatusCode.BAD_REQUEST
                );
        }
    }

    throw new CustomError(`Unsupported file type: ${type}`, StatusCode.BAD_REQUEST);
}
