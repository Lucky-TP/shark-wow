import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { getUser } from "src/libs/databases/users";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";
import { EditUserPayload } from "src/interfaces/payload/userPayload";
import { CommentData } from "src/interfaces/datas/comment";
import { UserData } from "src/interfaces/datas/user";
import { updateUser } from "src/libs/databases/users/updateUser";
import { getComments } from "src/libs/databases/comments";
import { ShowProject } from "src/interfaces/datas/project";
import { getProjects } from "src/libs/databases/projects/getProjects";

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags:
 *       - users
 *     description: Return user self data
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Fetch user self data successful!
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *
 *   put:
 *     tags:
 *       - users
 *     description: Update user self data
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */
export async function GET(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const retrivedUser = await getUser(tokenData.uid);

        // get own project datas
        const ownProjects: ShowProject[] = [];
        if (retrivedUser.ownProjectIds.length > 0) {
            const showProjects = await getProjects(retrivedUser.ownProjectIds, (projectModel) => {
                const showProject: ShowProject = {
                    projectId: projectModel.projectId,
                    name: projectModel.name,
                    carouselImageUrls: projectModel.carouselImageUrls,
                    description: projectModel.description,
                    stages: projectModel.stages,
                    category: projectModel.category,
                    status: projectModel.status,
                };
                return showProject;
            });
            ownProjects.push(...showProjects);
        }

        const receivedComments: CommentData[] = await getComments(retrivedUser.receivedCommentIds);
        const { receivedCommentIds, ownProjectIds, ...extractedUser } = retrivedUser;
        const userData: UserData = {
            ...extractedUser,
            ownProjects,
            receivedComments,
        };

        return NextResponse.json(
            { message: "Retrived user successful", data: userData },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}

export async function PUT(request: NextRequest) {
    try {
        const tokenData = await withAuthVerify(request);
        const uid = tokenData.uid;
        const body: Partial<EditUserPayload> = await request.json();
        await updateUser(uid, body);
        return NextResponse.json(
            { message: "Update user successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
