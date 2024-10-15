import { NextRequest, NextResponse } from "next/server";
import { getUser } from "src/libs/databases/firestore/users";
import { updateUser } from "src/libs/databases/firestore/users/updateUser";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";
import { StatusCode } from "src/constants/statusCode";

/**
 * @swagger
 * /api/users/favorites/{projectId}:
 *   put:
 *     tags:
 *       - users
 *     description: Update the list of user's favorite projects. If the project ID is already in the favorites, it will be removed; otherwise, it will be added.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the project to be added or removed from favorites.
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated the favorite project list
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */

export const revalidate = 10;

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
