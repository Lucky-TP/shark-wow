import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { ProjectPreview, ProjectSummary } from "src/interfaces/datas/project";
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

        projectModels.forEach((projectModel) => {
            const { projectId, name, carouselImageUrls, totalSupporter, stages, status, update } =
                projectModel;
            if (projectModel.status === ProjectStatus.DRAFT) {
                const projectPreview: ProjectPreview = {
                    projectId,
                    name,
                    previewImageUrl: carouselImageUrls.length > 0 ? carouselImageUrls[0] : "",
                    totalSupports: totalSupporter,
                };
                creatorOwnProjects.drafted.push(projectPreview);
            } else {
                const currentStage = stages.find(({ status }) => status === StageStatus.CURRENT)!;
                const projectSummary: ProjectSummary = {
                    projectId,
                    name,
                    previewImageUrl: carouselImageUrls.length > 0 ? carouselImageUrls[0] : "",
                    totalSupports: totalSupporter,
                    currentStage,
                    projectStatus: status,
                    isFundingComplete: currentStage.fundingCost >= currentStage.goalFunding,
                    isUpdateOnce: update.length > 0,
                };

                switch (projectModel.status) {
                    case ProjectStatus.RUNNING:
                        creatorOwnProjects.launched.push(projectSummary);
                        break;
                    case ProjectStatus.FAIL:
                        creatorOwnProjects.failed.push(projectSummary);
                        break;
                    case ProjectStatus.SUCCESS:
                        creatorOwnProjects.completed.push(projectSummary);
                        break;
                    default:
                        console.warn(`Unknown project status: ${projectModel.status}`);
                }
            }
        });
        return NextResponse.json(
            { message: "Get creator own projects successful", data: creatorOwnProjects },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
