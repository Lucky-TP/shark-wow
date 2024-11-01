import { getDocRef, runTransaction } from "../commons";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";

export async function deleteProject(projectId: string) {
    try {
        await runTransaction(async (transaction) => {
            const projectDocRef = getDocRef(CollectionPath.PROJECT, projectId);
            const projectSnapshot = await transaction.get(projectDocRef);
            if (!projectSnapshot.exists) {
                throw new CustomError("Project not exist", StatusCode.NOT_FOUND);
            }
            transaction.delete(projectDocRef);
        });
    } catch (error: unknown) {
        throw new CustomError("Delete project failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
