import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";
import { getCollectionRef } from "../firestore";
import { CollectionPath } from "src/constants/firestore";
import { ProjectModel } from "src/interfaces/models/project";

export async function getProjects(projectIds: string[]) {
    try {
        const projectCollection = getCollectionRef(CollectionPath.PROJECT);
        const querySnapshot = await projectCollection.where("projectId", "in", projectIds).get();
        const retrievedProjects = querySnapshot.docs.map(
            (projectSnapshot) => projectSnapshot.data() as ProjectModel
        );
        return retrievedProjects;
    } catch (error: unknown) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError("Retrive projects failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
