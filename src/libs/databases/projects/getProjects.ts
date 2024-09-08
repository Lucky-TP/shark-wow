import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";
import { getCollectionRef } from "../firestore";
import { CollectionPath } from "src/constants/firestore";
import { ProjectModel } from "src/interfaces/models/project";
import { chunkArray } from "src/utils/api/queries";
import { DEFAULT_IN_QUERY_VALUE } from "src/constants/firestore/query/value";

export async function getProjects(
    projectIds: string[]
): Promise<ProjectModel[]>;

export async function getProjects<T>(
    projectIds: string[],
    callback: (projectModel: ProjectModel) => T
): Promise<T[]>;

export async function getProjects<T>(
    projectIds: string[],
    callback?: (projectModel: ProjectModel) => T
): Promise<T[]> {
    try {
        const projectCollection = getCollectionRef(CollectionPath.PROJECT);
        const chunks = chunkArray<string>(projectIds, DEFAULT_IN_QUERY_VALUE);
        const retrievedProjects: T[] = [];
        for (const chunk of chunks) {
            const querySnapshot = await projectCollection
                .where("projectId", "in", chunk)
                .get();
            const retrievedProjectChunk = querySnapshot.docs.map(
                (projectSnapshot) => {
                    const projectModel = projectSnapshot.data() as ProjectModel;
                    if (callback) {
                        return callback(projectModel);
                    }
                    return projectModel as T;
                }
            );
            retrievedProjects.push(...retrievedProjectChunk);
        }
        return retrievedProjects;
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError(
            "Retrive projects failed",
            StatusCode.INTERNAL_SERVER_ERROR
        );
    }
}
