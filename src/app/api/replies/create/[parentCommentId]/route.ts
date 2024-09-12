import { NextRequest, NextResponse } from "next/server";
import { StatusCode } from "src/constants/statusCode";
import { CreateReplyPayload } from "src/interfaces/payload/replyPayload";
import { getComments, updateComment } from "src/libs/databases/comments";
import { createReply } from "src/libs/databases/replies";
import { errorHandler } from "src/libs/errors/apiError";
import { withAuthVerify } from "src/utils/api/auth";

/**
 * @swagger
 * /api/replies/create/[parentCommentId]:
 *   post:
 *     tags:
 *       - replies
 *     description: Create replies to comment
 *     parameters:
 *       - name: parentCommentId
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Create reply successful
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *
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
