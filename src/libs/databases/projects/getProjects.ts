import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";
import { getCollectionRef } from "../firestore";
import { CollectionPath } from "src/constants/firestore";
import { ProjectModel } from "src/interfaces/models/project";

export async function getProjects<T>(
    projectIds: string[],
    callback?: (projectModel: ProjectModel) => T
): Promise<T[]> {
    try {
        const projectCollection = getCollectionRef(CollectionPath.PROJECT);
        const querySnapshot = await projectCollection.where("projectId", "in", projectIds).get();
        const retrievedProjects = querySnapshot.docs.map((projectSnapshot) => {
            const projectModel = projectSnapshot.data() as ProjectModel;
            if (callback) {
                return callback(projectModel);
            }
            return projectModel as T;
        });
        return retrievedProjects;
    } catch (error: unknown) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError("Retrive projects failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
