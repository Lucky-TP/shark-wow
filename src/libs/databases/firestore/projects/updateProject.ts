import { getDocRef, runTransaction } from "../commons";
import { CollectionPath } from "src/constants/firestore";
import { StatusCode } from "src/constants/statusCode";
import { CustomError } from "src/libs/errors/apiError";
import { ProjectModel } from "src/interfaces/models/project";

export async function updateProject(
    projectId: string,
    newProjectData: Partial<ProjectModel>
): Promise<void> {
    try {
        await runTransaction(async (transaction) => {
            const projectDocRef = getDocRef(CollectionPath.PROJECT, projectId);
            const projectSnapshot = await transaction.get(projectDocRef);
            if (!projectSnapshot.exists) {
                throw new CustomError("User does not exist", StatusCode.NOT_FOUND);
            }
            const currentProjectData = projectSnapshot.data() as ProjectModel;
            const updateData: Partial<ProjectModel> = {
                name: newProjectData.name ?? currentProjectData.name,
                carouselImageUrls:
                    newProjectData.carouselImageUrls ?? currentProjectData.carouselImageUrls,
                description: newProjectData.description ?? currentProjectData.description,
                address: newProjectData.address ?? currentProjectData.address,
                totalSupporter: newProjectData.totalSupporter ?? currentProjectData.totalSupporter,
                totalQuantity: newProjectData.totalQuantity ?? currentProjectData.totalQuantity,
                costPerQuantity:
                    newProjectData.costPerQuantity ?? currentProjectData.costPerQuantity,
                status: newProjectData.status ?? currentProjectData.status,
                category: newProjectData.category ?? currentProjectData.category,
                stages: newProjectData.stages ?? currentProjectData.stages,
                story: newProjectData.story ?? currentProjectData.story,
                discussionIds: newProjectData.discussionIds ?? currentProjectData.discussionIds,
                update: newProjectData.update ?? currentProjectData.update,
                website: newProjectData.website ?? currentProjectData.website,
            };
            transaction.update(projectDocRef, updateData);
        });
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof CustomError) {
            throw error;
        }
        throw new CustomError("Update project failed", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
