import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import {
    ProjectCompletedSummary,
    ProjectFailedSummary,
    ProjectLaunchedSummary,
    ProjectPreview,
} from "src/interfaces/datas/project";
import { CreatorOwnProjects } from "src/interfaces/datas/user";
import { ProjectStatus, StageStatus } from "src/interfaces/models/enums";
import { getProjects } from "src/libs/databases/firestore/projects";
import { getUser } from "src/libs/databases/firestore/users";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";

/**
 * @swagger
 * /api/users/me/creator-view/own-projects:
 *   get:
 *     tags:
 *       - users
 *     summary: Retrieve the creator's own projects
 *     description: Returns the drafted, launched, failed, and completed projects of the authenticated user.
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched creator's own projects
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error - An unexpected error occurred
 */

export const revalidate = 10;

export async function GET(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const userData = await getUser(tokenData.uid);
        const projectModels = await getProjects(userData.ownProjectIds);
        const creatorOwnProjects: CreatorOwnProjects = {
            drafted: [],
            launched: [],
            failed: [],
            completed: [],
        };

        projectModels.forEach((projectModel, index) => {
            const { projectId, name, carouselImageUrls, totalSupporter, stages, status, update } =
                projectModel;

            // Common properties
            const previewImageUrl = carouselImageUrls.length > 0 ? carouselImageUrls[0] : "";
            const commonProjectSummary = {
                projectId,
                name,
                previewImageUrl,
                totalSupports: totalSupporter,
                projectStatus: status,
            };

            switch (status) {
                case ProjectStatus.DRAFT: {
                    const projectPreview: ProjectPreview = {
                        ...commonProjectSummary,
                    };
                    creatorOwnProjects.drafted.push(projectPreview);
                    break;
                }
                case ProjectStatus.RUNNING: {
                    const currentStage = stages.find(
                        ({ status }) => status === StageStatus.CURRENT
                    )!;
                    const projectSummary: ProjectLaunchedSummary = {
                        ...commonProjectSummary,
                        currentStage,
                        isFundingComplete: currentStage.fundingCost >= currentStage.goalFunding,
                        isUpdateOnce: update.length > 0,
                    };
                    creatorOwnProjects.launched.push(projectSummary);
                    break;
                }
                case ProjectStatus.SUCCESS: {
                    const projectSummary: ProjectCompletedSummary = {
                        ...commonProjectSummary,
                    };
                    creatorOwnProjects.completed.push(projectSummary);
                    break;
                }
                case ProjectStatus.FAIL: {
                    const failedStage = stages.find(({ status }) => status === StageStatus.FAILED)!;
                    const projectSummary: ProjectFailedSummary = {
                        ...commonProjectSummary,
                        failedStage,
                    };
                    creatorOwnProjects.failed.push(projectSummary);
                    break;
                }
                default:
                    console.warn(`Unhandled project ${index}, status: ${status} (PENDING)`);
            }
        });
        console.log("Successfully retrieved creator's own projects:", creatorOwnProjects);
        return NextResponse.json(
            { message: "Get creator own projects successful", data: creatorOwnProjects },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        console.error("Error retrieving creator's own projects:", error);
        return errorHandler(error);
    }
}
