import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { CreateReplyPayload } from "src/interfaces/payload/replyPayload";
import { getComments, updateComment } from "src/libs/databases/firestore/comments";
import { createReply } from "src/libs/databases/firestore/replies";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";

/**
 * @swagger
 * /api/replies/create/{parentCommentId}:
 *   post:
 *     tags:
 *       - replies
 *     description: Create a reply to a comment specified by `parentCommentId`. This endpoint allows users to add a new reply to an existing comment.
 *     parameters:
 *       - in: path
 *         name: parentCommentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the parent comment to which the reply will be added.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detail:
 *                 type: string
 *                 description: The detail of the reply.
 *             required:
 *               - detail
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Reply successfully created
 *       400:
 *         description: Bad request - Invalid input or data format
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Not Found - The pa
 */

export async function POST(
    request: NextRequest,
    { params }: { params: { parentCommentId: string } }
) {
    try {
        const author = await withAuthVerify(request);
        const body: CreateReplyPayload = await request.json();
        const parentCommentId = params.parentCommentId;
        const replyId = await createReply(author.uid, parentCommentId, body);
        const parentComment = (await getComments([parentCommentId]))[0];
        if (!parentComment) {
            return NextResponse.json(
                { message: "Parent comment not found" },
                { status: StatusCode.NOT_FOUND }
            );
        }
        const newReplyIds = [...parentComment.replys.map(({ replyId }) => replyId), replyId];
        await updateComment(parentCommentId, { replyIds: newReplyIds });
        return NextResponse.json(
            { message: "Create reply successful" },
            { status: StatusCode.CREATED }
        );
    } catch (error: unknown) {
        return errorHandler(error);
    }
}
