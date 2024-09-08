import { getDocRef } from "../firestore";
import { ProjectModel } from "src/interfaces/models/project";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";

export async function getProject(projectId: string) {
    try {
        const projectDocRef = getDocRef(CollectionPath.PROJECT, projectId);
        const projectSnapshot = await projectDocRef.get();

        if (!projectSnapshot.exists) {
            throw new CustomError("Project not exists", StatusCode.NOT_FOUND);
        }

        return projectSnapshot.data() as ProjectModel;
    } catch (error: unknown) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError(
            "Get project failed",
            StatusCode.INTERNAL_SERVER_ERROR
        );
    }
}
