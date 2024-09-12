import { NextRequest, NextResponse } from "next/server";
import { getUser } from "src/libs/databases/users";
import { updateUser } from "src/libs/databases/users/updateUser";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";

/**
 * @swagger
 * /api/users/favorites/[projectId]:
 *
 *   put:
 *     tags:
 *       - users
 *     description: Update user favorite project
 *     parameters:
 *       - name: projectId
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Update favorite project successful
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */

export async function PUT(request: NextRequest, { params }: { params: { projectId: string } }) {
    const newProjectId = params.projectId;
    try {
        const tokenData = await withAuthVerify(request);
        const retrivedUser = await getUser(tokenData.uid);

        let newFavoriteProjectIds = [...retrivedUser.favoriteProjectIds];
        if (newFavoriteProjectIds.includes(newProjectId)) {
            newFavoriteProjectIds = newFavoriteProjectIds.filter(
                (existedProjectId) => existedProjectId !== newProjectId
            );
        } else {
            newFavoriteProjectIds.push(newProjectId);
        }
        await updateUser(tokenData.uid, {
            favoriteProjectIds: newFavoriteProjectIds,
        });
        return NextResponse.json(
            { message: "Update favorite project successful" },
            { status: StatusCode.SUCCESS }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
