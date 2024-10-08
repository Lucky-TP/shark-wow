import { newDocRef } from "../commons";
import { ProjectModel } from "src/interfaces/models/project";
import { StatusCode } from "src/constants/statusCode";
import { CollectionPath } from "src/constants/firestore";
import { CustomError } from "src/libs/errors/apiError";

export async function addNewProject(projectData: ProjectModel): Promise<string> {
    try {
        const projectDoc = newDocRef(CollectionPath.PROJECT);
        const projectSnapshot = await projectDoc.get();

        if (projectSnapshot.exists) {
            throw new CustomError("Project exists", StatusCode.ALREADY_EXISTS);
        }
        const newProjectId = projectDoc.id;
        projectData.projectId = newProjectId;
        await projectDoc.set(projectData);
        return newProjectId;
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError("Add new project failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
