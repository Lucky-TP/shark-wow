import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "src/libs/errors/apiError";
import { getUser, updateUser } from "src/libs/databases/users";
import { createComment } from "src/libs/databases/comments/createComment";
import { CreateCommentPayload } from "src/interfaces/payload/commentPayload";
import { StatusCode } from "src/constants/statusCode";
import { withAuthVerify } from "src/utils/api/auth";

/**
 * @swagger
 * /api/comments/user/{userId}:
 *   post:
 *     tags:
 *       - comments
 *     description: Create a comment for a user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the user to comment on.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detail:
 *                 type: string
 *                 description: The content of the comment.
 *             required:
 *               - detail
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully created a comment for the user.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 */

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const author = await withAuthVerify(request);
        const targetUserId = params.userId;
        const body: CreateCommentPayload = await request.json();

        const commentId = await createComment(author.uid, body);
        const targetUserModel = await getUser(targetUserId);

        const newReceivedCommentIds = [...targetUserModel.receivedCommentIds, commentId];
        await updateUser(targetUserId, {
            receivedCommentIds: newReceivedCommentIds,
        });
        return NextResponse.json(
            { message: "Create comment to uesr successful" },
            { status: StatusCode.CREATED }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
