import { getDocRef } from "../firestore";
import { ProjectModel } from "src/interfaces/models/project";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { CustomError } from "src/libs/errors/apiError";

export async function addNewProject(projectData: ProjectModel) {
    try {
        const { projectId } = projectData;
        const projectDoc = getDocRef(CollectionPath.PROJECT, projectId);
        const projectSnapshot = await projectDoc.get();

        if (projectSnapshot.exists) {
            throw new CustomError("Project exists", StatusCode.ALREADY_EXISTS);
        }

        await projectDoc.set(projectData);
    } catch (error: unknown) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError(
            "Add new user failed",
            StatusCode.INTERNAL_SERVER_ERROR
        );
    }
}
