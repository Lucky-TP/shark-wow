import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { getProjects } from "src/libs/databases/firestore/projects/getProjects";
import { getUser } from "src/libs/databases/firestore/users";
import { errorHandler } from "src/libs/errors/apiError";
import { ShowProject } from "src/interfaces/datas/project";
import { PublicUserData } from "src/interfaces/datas/user";
import { ProjectStatus } from "src/interfaces/models/enums";

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     tags:
 *       - users
 *     description: Retrieve user information by user ID, including project summaries and profile details.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the user whose information is to be retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved user information
 *       404:
 *         description: User with the specified ID does not exist
 *       500:
 *         description: Internal server error
 */

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const uid = params.userId;
        const userModel = await getUser(uid);

        const showProjectsWithUndefined = await getProjects(
            userModel.ownProjectIds,
            (projectModel) => {
                if (projectModel.status !== ProjectStatus.DRAFT) {
                    return {
                        projectId: projectModel.projectId,
                        name: projectModel.name,
                        carouselImageUrls: projectModel.carouselImageUrls,
                        description: projectModel.description,
                        stages: projectModel.stages,
                        category: projectModel.category,
                        status: projectModel.status,
                    } as ShowProject;
                }
                return undefined;
            }
        );
        const projectSummarizes: ShowProject[] = showProjectsWithUndefined.filter(
            (project) => project !== undefined
        );

        const publicUserData: PublicUserData = {
            uid: userModel.uid,
            username: userModel.username,
            firstName: userModel.firstName,
            lastName: userModel.lastName,
            aboutMe: userModel.aboutMe,
            profileImageUrl: userModel.profileImageUrl,
            popularDetail: userModel.popularDetail,
            receivedCommentIds: userModel.receivedCommentIds,
            address: userModel.address,
            contact: userModel.contact,
            cvUrl: userModel.cvUrl,
            projectSummarizes,
            birthDate: userModel.birthDate,
            role: userModel.role,
        };
        return NextResponse.json(
            { message: "Get user successful", data: publicUserData },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        console.log(error);
        return errorHandler(error);
    }
}
