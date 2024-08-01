import { CollectionPath } from "src/constants/collection";
import { ProjectModel } from "src/interfaces/models/project";
import { getDoc } from "./utils";
import { CustomError } from "src/utils/errors/customError";
import { StatusCode } from "src/constants/statusCode";

const PROJECT_COLLECTION = CollectionPath.PROJECT;

export async function addNewProject(projectData: ProjectModel) {
    try {
        const projectDoc = getDoc(PROJECT_COLLECTION, projectData.projectId);
        const projectSnapshot = await projectDoc.get();

        if(projectSnapshot.exists){
            throw new CustomError("Project exists", StatusCode.ALREADY_EXISTS);
        }

        await projectDoc.set(projectData);

    } catch (error: any) {
        throw error;
    }
}