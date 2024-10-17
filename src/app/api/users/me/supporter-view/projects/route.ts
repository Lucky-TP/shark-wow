import { NextRequest, NextResponse } from "next/server";
import { SupporterSummaryProjects } from "src/interfaces/datas/user";
import { StageId, StageStatus } from "src/interfaces/models/enums";
import { getProjects } from "src/libs/databases/firestore/projects";
import { getTransactionLogsByUserId } from "src/libs/databases/firestore/transactionLogs";
import { getUser, getUsers } from "src/libs/databases/firestore/users";
import { errorHandler } from "src/libs/errors/apiError";
import { StatusCode } from "src/constants/statusCode";
import { withAuthVerify } from "src/utils/api/auth";
import { ProjectModel, Stage } from "src/interfaces/models/project";
import { ExtendProjectPreview } from "src/interfaces/datas/project";
import { TransactionLog } from "src/interfaces/models/transaction";

/**
 * @swagger
 * /api/users/me/supporter-view/projects:
 *   get:
 *     tags:
 *       - users
 *     summary: Retrieve summary projects for the authenticated user's supporter view
 *     description:
 *       This endpoint fetches summary projects for the authenticated user's supporter view,
 *       including favorited and contributed projects. The request requires authentication
 *       via a valid token in the cookies.
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched supporter view's summary projects
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error - An unexpected error occurred
 */

export const revalidate = 10;

export async function GET(request: NextRequest) {
    try {
        console.log("Starting request to retrieve user's project summary");

        // Verify token and retrieve user data
        const tokenData = await withAuthVerify(request);
        console.log(`User authenticated with UID: ${tokenData.uid}`);

        const retrivedUser = await getUser(tokenData.uid);

        // Fetch transaction logs and projects
        const contributedTransactions = await getTransactionLogsByUserId(retrivedUser.uid);
        const contributedProjectIds = contributedTransactions.map(({ projectId }) => projectId);

        const [favoritedProjectModels, contributedProjectModels] = await Promise.all([
            getProjects(retrivedUser.favoriteProjectIds),
            getProjects(contributedProjectIds),
        ]);
        console.log("Fetched favorited and contributed project models");

        // Map project IDs to contributed stages
        const projectIdMappingToContributedStageIds: { [key: string]: Set<StageId> } = {};
        contributedTransactions.forEach((transactionLog) => {
            const projectId = transactionLog.projectId;
            if (!projectIdMappingToContributedStageIds[projectId]) {
                projectIdMappingToContributedStageIds[projectId] = new Set();
            }
            projectIdMappingToContributedStageIds[projectId].add(transactionLog.stageId);
        });

        // Extend project preview data
        const createExtendProjectPreview = (projectModel: ProjectModel): ExtendProjectPreview => {
            const contributedStages: Stage[] = [];
            if (projectIdMappingToContributedStageIds[projectModel.projectId]) {
                contributedStages.push(
                    ...projectModel.stages.filter(({ stageId }) =>
                        projectIdMappingToContributedStageIds[projectModel.projectId].has(stageId)
                    )
                );
            }

            const extendProjectPreview: ExtendProjectPreview = {
                projectId: projectModel.projectId,
                name: projectModel.name,
                previewImageUrl: projectModel.carouselImageUrls?.[0] ?? "",
                totalSupports: projectModel.totalSupporter,
                totalQuantity: projectModel.totalQuantity,
                costPerQuantity: projectModel.costPerQuantity,
                currentStage: projectModel.stages.find(
                    ({ status }) => status === StageStatus.CURRENT
                )!,
                stages: projectModel.stages,
                contributedStages,
            };
            return extendProjectPreview;
        };
        console.log("Created project previews");

        const favoritedProjects = favoritedProjectModels.map(createExtendProjectPreview);
        const contributedProjects = contributedProjectModels.map(createExtendProjectPreview);

        // Prepare summary
        const summaryProjects: SupporterSummaryProjects = {
            favorited: favoritedProjects,
            contributed: contributedProjects,
        };

        console.log("Successfully fetched and prepared project summary:", summaryProjects);
        return NextResponse.json(
            {
                message: "Fetch supporter view's summary projects successful!",
                data: summaryProjects,
            },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        console.error("Error fetching project summary", error);
        return errorHandler(error);
    }
}
